import {
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  PropertyValues,
  query,
  TemplateResult,
} from 'lit-element';
import { store } from './redux/store';
import { connect } from 'pwa-helpers';
import { SelectedDetail } from '@material/mwc-list/mwc-list-foundation';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-filestorage.pcss';

import { Action } from 'redux';
import { RootState } from './redux/ducks';

import * as fromLayout from './redux/ducks/layout';
import * as fromView from './redux/ducks/view-mode';
import * as fromList from './redux/ducks/list';
import * as fromTree from './redux/ducks/tree';
import * as fromFileActions from './redux/ducks/file-actions';
import * as fromGlobalActions from './redux/ducks/global-actions';

import { Typo3Node } from '../../../packages/filetree/src/lib/typo3-node';
import { orderBy } from 'lodash-es';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { addSlotToRawHtml } from './lib/utils';
import { Typo3Card } from '../../../packages/card/src/typo3-card';
import { Typo3Filetree } from '../../../packages/filetree/src/typo3-filetree';
import { Typo3Draghandler } from '../../../packages/draghandler/src/typo3-draghandler';
import { Typo3FilesModal } from './typo3-files-modal';
import { Typo3ConfirmModal } from './typo3-confirm-modal';

@customElement('typo3-filestorage')
export class Typo3Filestorage extends connect(store)(LitElement) {
  @property({ type: String }) treeUrl!: string;
  @property({ type: String }) fileActionUrl!: string;

  @property({ type: Object }) translations: { [key: string]: string } = {};
  @property({ type: Object }) iconUrls: { [key: string]: string } = {};

  @property({ type: Array }) private storages: Storage[] = [];

  @property({ type: Number }) private selectedStorageUid = 0;

  @internalProperty() private state!: RootState;

  @query('.content_left') contentLeft!: HTMLElement;
  @query('.content_right') contentRight!: HTMLElement;

  @query('typo3-filetree') fileTree!: Typo3Filetree;
  @query('typo3-draghandler') filesDragHandler!: Typo3Draghandler;
  @query('typo3-files-modal') moveFilesModal!: Typo3FilesModal;

  @query('#file_upload') fileUploadInput!: HTMLInputElement;

  public static styles = [themeStyles, styles];

  stateChanged(state: RootState): void {
    this.state = state;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    store.dispatch(new fromTree.LoadTreeData(this.treeUrl));
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dragleave', this._onDragLeave);
    this.addEventListener('dragover', this._onDragOver);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dragleave', this._onDragLeave);
    this.addEventListener('dragover', this._onDragOver);
  }

  refresh(): void {
    store.dispatch(new fromGlobalActions.Reload() as Action);
  }

  get listHeader(): {
    name: string;
    type?: string;
    width?: string;
    title: string;
    hidden?: boolean;
    sortable?: boolean;
  }[] {
    return [
      { name: 'identifier', type: 'text', title: ' ', hidden: true },
      { name: 'icon', type: 'html', title: ' ', width: '24' },
      { name: 'name', title: this.translations['field.name'], sortable: true },
      {
        name: 'modified',
        title: this.translations['field.modified'],
        width: '150',
        sortable: true,
      },
      {
        name: 'size',
        title: this.translations['field.size'],
        width: '100',
        sortable: true,
      },
      { name: 'type', title: this.translations['field.type'], width: '150' },
      {
        name: 'variants',
        title: this.translations['field.variants'],
        width: '100',
      },
      {
        name: 'references',
        title: this.translations['field.references'],
        width: '100',
      },
      { name: 'rw', title: this.translations['field.rw'], width: '50' },
    ];
  }

  protected render(): TemplateResult {
    return html`
      <typo3-splitpane
        @splitter-dragend="${this._onSplitterDragend}"
        style="height: 100%;"
      >
        <div
          class="content_left"
          style="${'flex: 1 1 ' + fromLayout.getSidebarWidth(this.state) + '%'}"
        >
          <div class="topbar-wrapper">
            <typo3-topbar>
              <div slot="left">${this.getStorageDropDown()}</div>
            </typo3-topbar>
            <typo3-topbar>
              <div slot="left">
                <typo3-button
                  .disabled="${fromTree.getSelectedTreeNode(this.state) ==
                  null}"
                  @click="${() =>
                    this.fileTree.addNode(
                      fromTree.getSelectedTreeNode(this.state)
                        ?.identifier as string
                    )}"
                >
                  <svg slot="icon">
                    <use
                      xlink:href=""
                      xlink:href="${this.iconUrls['new']}"
                    ></use>
                  </svg>
                  ${this.translations['new']}
                </typo3-button>
                <typo3-button
                  .disabled="${fromTree.getSelectedTreeNode(this.state) ==
                  null}"
                  @click="${() => this.fileUploadInput.click()}"
                >
                  <svg slot="icon">
                    <use
                      xlink:href=""
                      xlink:href="${this.iconUrls['upload']}"
                    ></use>
                  </svg>
                  ${this.translations['upload']}
                </typo3-button>
                <input
                  type="file"
                  id="file_upload"
                  style="display: none"
                  multiple
                  @change="${this._onDialogFileUpload}"
                />
              </div>
            </typo3-topbar>
          </div>
          <typo3-filetree
            .nodes="${fromTree.getTreeNodes(this.state)}"
            .expandedNodeIds="${fromTree.getExpandedTreeNodeIds(this.state)}"
            .selectedNodeIds="${fromTree.selectedTreeNodeIdentifiers(
              this.state
            )}"
            ?editable="${true}"
            ?dragDropEnabled="${true}"
            ?inDropMode="${fromFileActions.isDraggingFiles(this.state)}"
            @typo3-node-drop="${this._onTreeNodeDrop}"
            @typo3-node-select="${this._onSelectedNode}"
            @typo3-node-contextmenu="${this._onContextMenu}"
            @typo3-node-expand="${this._onNodeExpand}"
            @typo3-node-collapse="${this._onNodeCollapse}"
            @typo3-node-move="${this._onTreeNodeMove}"
            @typo3-node-rename="${(e: CustomEvent) =>
              this._onRename(e.detail.node.identifier, e.detail.name)}"
            @typo3-node-add="${(e: CustomEvent) =>
              this._onFolderAdd(e.detail.node, e.detail.parentNode)}"
          ></typo3-filetree>
        </div>
        <typo3-dropzone
          class="content_right"
          style="${'flex: 1 1 ' +
          (100 - fromLayout.getSidebarWidth(this.state)) +
          '%'}"
          @typo3-dropzone-drop="${this._onDragAndDropFileUpload}"
          @typo3-dropzone-should-accept="${this._onDropZoneShouldAccept}"
        >
          <div class="topbar-wrapper">
            <typo3-topbar>
              <typo3-breadcrumb slot="left">
                ${this.breadcrumbContent}
              </typo3-breadcrumb>
              <div slot="right">
                ${this.getSortingDropdown()} ${this.getViewModeDropDown()}
              </div>
            </typo3-topbar>
            <typo3-topbar>
              <div slot="left">
                <typo3-button
                  @click="${this._onDownload}"
                  .disabled="${fromList.isEmptySelection(this.state) ||
                  fromFileActions.isDownloadingFiles(this.state)}"
                >
                  <svg slot="icon">
                    <use
                      xlink:href=""
                      xlink:href="${this.iconUrls['download']}"
                    ></use>
                  </svg>
                  ${this.translations['download']}
                </typo3-button>
                <typo3-button
                  .disabled="${fromList.isEmptySelection(this.state)}"
                  @click="${this._onDeleteClicked}"
                >
                  <svg slot="icon">
                    <use
                      xlink:href=""
                      xlink:href="${this.iconUrls['delete']}"
                    ></use>
                  </svg>
                  ${this.translations['delete']}
                </typo3-button>
                <typo3-button
                  .disabled="${fromList.isEmptySelection(this.state)}"
                  @click="${() => this._showFilesModalDialog('move')}"
                >
                  <svg slot="icon">
                    <use
                      xlink:href=""
                      xlink:href="${this.iconUrls['moveTo']}"
                    ></use>
                  </svg>
                  ${this.translations['moveTo']}
                </typo3-button>
                <typo3-button
                  .disabled="${fromList.isEmptySelection(this.state)}"
                  @click="${() => this._showFilesModalDialog('copy')}"
                >
                  <svg slot="icon">
                    <use
                      xlink:href=""
                      xlink:href="${this.iconUrls['copyTo']}"
                    ></use>
                  </svg>
                  ${this.translations['copyTo']}
                </typo3-button>
              </div>
              <div slot="right">
                <typo3-selection-button
                  suffix="${this.translations['selected']}"
                  count="${fromList.getSelectedItems(this.state).length}"
                  @typo3-selection-clear="${this._onClearSelection}"
                ></typo3-selection-button>
              </div>
            </typo3-topbar>
          </div>
          ${this.mainContent}
        </typo3-dropzone>
      </typo3-splitpane>
      <typo3-context-menu
        @typo3-context-menu-item-click="${this._onContextMenuItemClick}"
      ></typo3-context-menu>
      ${this.getDragHandler()}
      <typo3-files-modal
        .translations="${this.translations}"
        @typo3-move-files="${this._onMoveFilesModal}"
      ></typo3-files-modal>
    `;
  }

  protected get breadcrumbContent(): TemplateResult[] {
    const nodes = fromTree.getSelectedTreeNodePath(this.state) as Typo3Node[];
    return nodes.map(
      node =>
        html` <typo3-breadcrumb-item slot="item" title="${node.name}">
        </typo3-breadcrumb-item>`
    );
  }

  protected get mainContent(): TemplateResult {
    if (fromList.getItems(this.state).length === 0) {
      if (true === fromGlobalActions.isLoading(this.state)) {
        return html``;
      }

      return html` <div class="main-content main-content-info">
        <svg>
          <use xlink:href="" xlink:href="${this.iconUrls['emptyFolder']}"></use>
        </svg>
        <h3>${this.translations['emptyFolder']}</h3>
        <span>${this.translations['dragFilesUploadMessage']}</span>
      </div>`;
    }

    if (fromView.isListMode(this.state)) {
      return html` <typo3-datagrid
        class="main-content"
        style="width: 100%; overflow: auto;"
        draggable="${fromList.isEmptySelection(this.state) ? 'false' : 'true'}"
        schema="${JSON.stringify(this.listHeader)}"
        data="${JSON.stringify(fromList.getItems(this.state))}"
        editableColumns='["name"]'
        .selectedRows="${fromList.getSelectedItems(this.state)}"
        @dragstart="${this._onDragStart}"
        @contextmenu="${this._onContextMenuWithoutContext}"
        @typo3-datagrid-selection-change="${this._onDatagridSelectionChange}"
        @typo3-datagrid-contextmenu="${this._onContextMenu}"
        @typo3-datagrid-value-change="${(e: CustomEvent) =>
          this._onRename(e.detail.data.identifier, e.detail.data.name)}"
      ></typo3-datagrid>`;
    }

    const orderedData = orderBy(
      fromList.getItems(this.state),
      [item => item.type === 'Folder', fromView.getSortField(this.state)],
      ['desc', fromView.getSortDirection(this.state)]
    );

    const hash = orderedData.map(item => item.identifier).join(',');

    return html`<typo3-grid
      class="main-content"
      hash="${hash}"
      selectable
      draggable="${fromList.isEmptySelection(this.state) ? 'false' : 'true'}"
      @contextmenu="${this._onContextMenuWithoutContext}"
      @dragstart="${this._onDragStart}"
      @typo3-grid-selection-changed="${this._onCardgridSelectionChange}"
    >
      ${orderedData.map(listData => this.getCardContent(listData))}
    </typo3-grid>`;
  }

  protected getCardContent(listData: ListItem): TemplateResult {
    const rawIcon = addSlotToRawHtml(listData.icon, 'image');
    let imageSlot = html`${unsafeHTML(rawIcon)}`;
    if (listData.thumbnailUrl) {
      imageSlot = html`<img
        slot="image"
        loading="lazy"
        src="${listData.thumbnailUrl}"
        alt="${listData.name}"
      />`;
    }

    let badge = html``;

    if (listData.type === 'Folder') {
      const sizeNumeric = parseInt(listData.size.replace(/^\D+/g, ''));
      badge = html`<typo3-badge
        slot="badge"
        title="${sizeNumeric}"
      ></typo3-badge>`;
    }

    const contextMenuCallback = (e: MouseEvent) => {
      this._onContextMenu(
        new CustomEvent('typo3-card-context-menu', {
          detail: { event: e, node: listData },
        })
      );
    };

    return html` <typo3-card
      slot="item"
      ?selected="${fromList.isItemSelected(this.state)(listData.identifier)}"
      value="${listData.identifier}"
      title="${listData.name}"
      subtitle="${listData.modified}"
      variant="${listData.thumbnailUrl ? 'preview' : 'standard'}"
      ?titleEditable="${true}"
      @contextmenu="${contextMenuCallback}"
      @typo3-card-title-rename="${(e: CustomEvent) =>
        this._onRename(listData.identifier, e.detail)}"
      >${imageSlot} ${badge}
    </typo3-card>`;
  }

  protected getViewModeDropDown(): TemplateResult {
    return html`
      <typo3-dropdown activatable @selected="${this._onSelectViewMode}">
        <typo3-dropdown-button slot="button" color="default">
          <svg slot="icon">
            <use xlink:href="" xlink:href="${this.iconUrls['view.mode']}"></use>
          </svg>
          ${this.translations['view.mode']}
        </typo3-dropdown-button>
        <typo3-dropdown-item
          value="${fromView.ViewMode.LIST}"
          ?selected="${fromView.isListMode(this.state)}"
        >
          <svg slot="icon">
            <use
              xlink:href=""
              xlink:href="${this.iconUrls['view.mode.list']}"
            ></use>
          </svg>
          <span>${this.translations['view.mode.list']}</span>
        </typo3-dropdown-item>
        <li divider></li>
        <typo3-dropdown-item
          value="${fromView.ViewMode.TILES}"
          ?selected="${fromView.isTilesMode(this.state)}"
        >
          <svg slot="icon">
            <use
              xlink:href=""
              xlink:href="${this.iconUrls['view.mode.tiles']}"
            ></use>
          </svg>
          <span>${this.translations['view.mode.tiles']}</span>
        </typo3-dropdown-item>
      </typo3-dropdown>
      ${fromGlobalActions.isLoading(this.state)
        ? html`<div class="loading"><typo3-spinner></typo3-spinner></div>`
        : html``}
    `;
  }

  protected getSortingDropdown(): TemplateResult {
    return html`
      <typo3-dropdown multi activatable>
        <typo3-dropdown-button
          slot="button"
          color="default"
          .disabled="${fromView.isListMode(this.state)}"
        >
          <svg slot="icon">
            <use
              xlink:href=""
              xlink:href="${this.iconUrls['view.sorting']}"
            ></use>
          </svg>
          <span>${this.translations['view.sorting']}</span>
        </typo3-dropdown-button>
        ${this.listHeader
          .filter(header => header.sortable === true)
          .map(listHeader => {
            return html`
              <typo3-dropdown-item
                activated
                group="sort_field"
                ?selected="${fromView.isSortField(this.state)(listHeader.name)}"
                value="${listHeader.name}"
                @click="${() => this._onSelectSortField(listHeader.name)}"
              >
                <span>${listHeader.title}</span>
              </typo3-dropdown-item>
            `;
          })}
        <li divider></li>
        ${[
          { title: this.translations['view.sortingdir.asc'], name: 'asc' },
          { title: this.translations['view.sortingdir.desc'], name: 'desc' },
        ].map(sortDir => {
          return html`
            <typo3-dropdown-item
              activated
              group="sort_dir"
              ?selected="${fromView.isSortDirection(this.state)(sortDir.name)}"
              value="${sortDir.name}"
              @click="${() => this._onSelectSortDirection(sortDir.name)}"
            >
              <span>${sortDir.title}</span>
            </typo3-dropdown-item>
          `;
        })}
      </typo3-dropdown>
    `;
  }

  protected getStorageDropDown(): TemplateResult {
    if (this.storages.length == 0) {
      return html``;
    }

    const selectedStorage = this.storages.find(
      storage => storage.uid === this.selectedStorageUid
    );

    return html`
      <typo3-dropdown id="storage_select" activatable>
        <typo3-dropdown-button slot="button" color="default">
          ${unsafeHTML(addSlotToRawHtml(selectedStorage!.icon, 'icon'))}
          ${selectedStorage!.name}
        </typo3-dropdown-button>
        ${this.storages.map(
          storage => html`
            <a href="${storage.storageUrl}">
              <typo3-dropdown-item
                ?selected="${storage.uid === this.selectedStorageUid}"
              >
                ${unsafeHTML(addSlotToRawHtml(storage!.icon, 'icon'))}
                ${storage.name}
              </typo3-dropdown-item>
            </a>
          `
        )}
      </typo3-dropdown>
    `;
  }

  protected getDragHandler(): TemplateResult {
    let iconUrl = this.iconUrls['moveTo'];
    let message = this.translations['dnd.move.message'];
    let title = this.translations['dnd.move.title'];

    if (fromFileActions.isCopyDragMode(this.state)) {
      iconUrl = this.iconUrls['copyTo'];
      message = this.translations['dnd.copy.message'];
      title = this.translations['dnd.copy.title'];
    }

    title = title
      ? title.replace(
          /%\w*/gm,
          '' + fromList.getSelectedItems(this.state).length
        )
      : '';

    return html`
      <typo3-draghandler
        .hidden="${fromFileActions.isDraggingFiles(this.state) !== true}"
        style="position: absolute; top: -1000px:"
      >
        <svg slot="icon">
          <use xlink:href="" xlink:href="${iconUrl}"></use>
        </svg>
        <span slot="title">${title}</span>
        <span slot="message">${unsafeHTML(message)}</span>
      </typo3-draghandler>
    `;
  }

  _onSplitterDragend(): void {
    window.dispatchEvent(new Event('resize'));

    const width = this.contentLeft.offsetWidth + this.contentRight.offsetWidth;
    store.dispatch(
      new fromLayout.SetSidebarWidth(
        Math.round((this.contentLeft.offsetWidth / width) * 100)
      )
    );
  }

  _onSelectedNode(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new fromTree.SelectTreeNode(event.detail.identifier));
    store.dispatch(new fromList.LoadListData(event.detail.folderUrl));
  }

  _onContextMenu(
    event: CustomEvent<{ event: MouseEvent; node: Typo3Node | ListItem }>
  ): void {
    event.detail.event.preventDefault();
    event.detail.event.stopImmediatePropagation();
    fetch(event.detail.node.contextMenuUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        window.dispatchEvent(
          new CustomEvent('typo3-show-context-menu', {
            detail: {
              sourceEvent: event.detail.event,
              options: data,
              contextItem: event.detail.node,
            },
          })
        );
      })
      .catch((error: Error) => {
        console.log(
          'todo: handle error on loading context-menu options',
          error
        );
      });
  }

  _onContextMenuWithoutContext(event: MouseEvent): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    if (null === currentNode) {
      return;
    }
    const customEvent = new CustomEvent<{
      event: MouseEvent;
      node: Typo3Node | ListItem;
    }>('unassigned-contextMenu', {
      detail: {
        node: currentNode,
        event: event,
      },
    });

    this._onContextMenu(customEvent);
  }

  _onSelectViewMode(event: CustomEvent<SelectedDetail>): void {
    store.dispatch(
      new fromView.SetViewMode(event.detail.index as fromView.ViewMode)
    );
  }

  _onSelectSortField(field: string): void {
    store.dispatch(new fromView.SetSortOrderField(field));
  }

  _onSelectSortDirection(direction: string): void {
    store.dispatch(new fromView.SetSortOrderDirection(direction));
  }

  _onClearSelection(): void {
    store.dispatch(new fromList.ClearSelection());
  }

  _onDatagridSelectionChange(event: CustomEvent<ListItem[]>): void {
    store.dispatch(
      new fromList.SetSelection(event.detail.map(row => row.identifier))
    );
  }

  _onCardgridSelectionChange(event: CustomEvent<Typo3Card[]>): void {
    store.dispatch(
      new fromList.SetSelection(
        event.detail.map((element: Typo3Card) => '' + element.value)
      )
    );
  }

  _onNodeExpand(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new fromTree.ExpandTreeNode(event.detail.identifier));
  }

  _onNodeCollapse(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new fromTree.CollapseTreeNode(event.detail.identifier));
  }

  _onDeleteClicked(): void {
    const action = new fromFileActions.DeleteFiles(
      fromList.getSelectedItems(this.state).map(data => data.identifier),
      this.fileActionUrl
    ) as Action;

    let message = this.translations['deleteConfirmMessage'];

    message = message
      ? message.replace(
          /%\w*/gm,
          '' +
            fromList
              .getSelectedItems(this.state)
              .map(item => item.name)
              .join("', '")
        )
      : '';

    this._confirmDelete(action, {
      headline: this.translations['deleteConfirmHeadline'],
      message: message,
      submitButtonText: this.translations['deleteConfirmSubmitButton'],
      cancelButtonText: this.translations['deleteConfirmCancelButton'],
    });
  }

  _onRename(identifier: string, name: string): void {
    store.dispatch(
      new fromFileActions.RenameFile(identifier, name, this.fileActionUrl)
    );
  }

  _onFolderAdd(node: Typo3Node, parentNode: Typo3Node): void {
    store.dispatch(
      new fromFileActions.AddFolder(node, parentNode, this.fileActionUrl)
    );
  }

  _onDialogFileUpload(): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    const dataTransfer = {
      files: this.fileUploadInput.files,
    };

    const action = new fromFileActions.UploadFiles(
      dataTransfer as DataTransfer,
      currentNode as Typo3Node,
      this.fileActionUrl
    ) as Action;

    store.dispatch(action);
  }

  _onDragAndDropFileUpload(event: CustomEvent<DragEvent>): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    const action = new fromFileActions.UploadFiles(
      event.detail.dataTransfer as DataTransfer,
      currentNode as Typo3Node,
      this.fileActionUrl
    ) as Action;

    store.dispatch(action);
  }

  _onDropZoneShouldAccept(event: CustomEvent<DragEvent>): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    if (null == currentNode) {
      event.preventDefault();
      return;
    }
    if (null === event.detail.dataTransfer) {
      event.preventDefault();
      return;
    }
    const dataTransfer = event.detail.dataTransfer as DataTransfer;

    if (dataTransfer.types.indexOf('Files') === -1) {
      event.preventDefault();
      return;
    }
  }

  _onContextMenuItemClick(
    event: CustomEvent<{
      contextItem: ListItem | Typo3Node;
      option: { callbackAction: string; additionalAttributes?: {} };
    }>
  ): void {
    const contextItem = event.detail.contextItem;
    const type =
      Object.prototype.hasOwnProperty.call(contextItem, 'type') &&
      (contextItem as ListItem).type !== 'Folder'
        ? '_FILE'
        : '_FOLDER';

    const identifier = contextItem.identifier;

    let storeAction: Action | null = null;

    const additionalAttributes = event.detail.option!.additionalAttributes;

    switch (event.detail.option.callbackAction) {
      case 'openInfoPopUp':
        storeAction = new fromFileActions.ShowFileInfo(identifier, type);
        break;
      case 'deleteFile':
        storeAction = new fromFileActions.DeleteFiles(
          [identifier],
          this.fileActionUrl
        );
        this._confirmDelete(storeAction, {
          headline: additionalAttributes['data-title'],
          message: additionalAttributes['data-message'],
          submitButtonText: additionalAttributes['data-button-ok-text'],
          cancelButtonText: additionalAttributes['data-button-close-text'],
        });
        return;

      case 'createFile':
        this.fileTree.addNode(identifier);
        break;
      case 'copyFile':
        storeAction = new fromFileActions.ClipboardCopyFile(
          contextItem.clipboardIdentifier,
          identifier
        );
        break;
      case 'copyReleaseFile':
        storeAction = new fromFileActions.ClipboardCopyReleaseFile(
          contextItem.clipboardIdentifier
        );
        break;
      case 'cutFile':
        storeAction = new fromFileActions.ClipboardCutFile(
          contextItem.clipboardIdentifier,
          identifier
        );
        break;
      case 'cutReleaseFile':
        storeAction = new fromFileActions.ClipboardCutReleaseFile(
          contextItem.clipboardIdentifier
        );
        break;
      case 'pasteFileInto':
        storeAction = new fromFileActions.ClipboardPaste(
          identifier,
          this.fileActionUrl
        );
        break;
      case 'editFileStorage':
        storeAction = new fromFileActions.EditFileStorage(identifier);
        break;
      default:
        console.info('Todo: Implement cb action', event.detail.option);
    }

    if (null !== storeAction) {
      store.dispatch(storeAction);
    }
  }

  _onDragStart(e: DragEvent): void {
    store.dispatch(new fromFileActions.DragFilesStart());
    const dummyElement = document.createElement('div');
    dummyElement.textContent = '.';
    dummyElement.style.position = 'absolute';

    document.body.appendChild(dummyElement);
    e.dataTransfer!.setDragImage(dummyElement, 0, 0);
  }

  _onTreeNodeDrop(e: CustomEvent<{ event: DragEvent; node: Typo3Node }>): void {
    const identifiers = fromList
      .getSelectedItems(this.state)
      .map((listItem: ListItem) => listItem.identifier);
    store.dispatch(new fromFileActions.DragFilesEnd());

    const action = fromFileActions.isCopyDragMode(this.state)
      ? new fromFileActions.CopyFiles(
          identifiers,
          e.detail.node,
          this.fileActionUrl
        )
      : new fromFileActions.MoveFiles(
          identifiers,
          e.detail.node,
          this.fileActionUrl
        );
    store.dispatch(action);
  }

  _onDragLeave(): void {
    store.dispatch(new fromFileActions.DragFilesEnd());
  }

  _onDragOver(e: DragEvent): void {
    const dragMode = e.ctrlKey == true ? 'copy' : 'move';
    if (dragMode != fromFileActions.getDragMode(this.state)) {
      store.dispatch(new fromFileActions.DragFilesChangeMode(dragMode));
    }
    this.filesDragHandler.style.top = e.offsetY + 10 + 'px';
    this.filesDragHandler.style.left = e.offsetX + 'px';
  }

  _showFilesModalDialog(mode: 'copy' | 'move'): void {
    this.moveFilesModal.nodes = fromTree.getTreeNodes(this.state);
    this.moveFilesModal.expandedNodeIds = fromTree.getExpandedTreeNodeIds(
      this.state
    );
    this.moveFilesModal.selectedFiles = fromList.getSelectedItems(this.state);
    this.moveFilesModal.mode = mode;
    this.moveFilesModal.show();
  }

  _onMoveFilesModal(
    e: CustomEvent<{ mode: string; files: ListItem[]; target: Typo3Node }>
  ): void {
    const action =
      e.detail.mode === 'copy'
        ? new fromFileActions.CopyFiles(
            e.detail.files.map(item => item.identifier),
            e.detail.target,
            this.fileActionUrl
          )
        : new fromFileActions.MoveFiles(
            e.detail.files.map(item => item.identifier),
            e.detail.target,
            this.fileActionUrl
          );

    store.dispatch(action);
  }

  _onDownload(): void {
    const identifiers = fromList
      .getSelectedItems(this.state)
      .map(item => item.identifier);
    const action = new fromFileActions.DownloadFiles(identifiers);
    store.dispatch(action);
  }

  _onTreeNodeMove(
    event: CustomEvent<{ event: DragEvent; node: Typo3Node; target: Typo3Node }>
  ): void {
    const action = new fromFileActions.MoveFiles(
      [event.detail.node.identifier],
      event.detail.target,
      this.fileActionUrl
    );
    store.dispatch(action);
  }

  _confirmDelete(
    action: Action,
    modalData: {
      headline: string;
      message: string;
      submitButtonText: string;
      cancelButtonText: string;
    }
  ) {
    const confirmDeleteModal = document.createElement(
      'typo3-confirm-modal'
    ) as Typo3ConfirmModal;
    this.shadowRoot!.append(confirmDeleteModal);
    confirmDeleteModal.headline = modalData.headline;
    confirmDeleteModal.message = modalData.message;
    confirmDeleteModal.submitButtonText = modalData.submitButtonText;
    confirmDeleteModal.cancelButtonText = modalData.cancelButtonText;

    confirmDeleteModal.addEventListener('typo3-confirm-submit', () =>
      store.dispatch(action)
    );
    setTimeout(() => confirmDeleteModal.show(), 10);
  }
}
