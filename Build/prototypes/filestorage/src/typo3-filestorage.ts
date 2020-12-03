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
import {
  SetSortOrderDirection,
  SetSortOrderField,
  SetViewMode,
  ViewMode,
} from './redux/ducks/view-mode';
import { RootState } from './redux/ducks';
import { SetSidebarWidth } from './redux/ducks/layout';
import * as ListActions from './redux/ducks/list';
import {
  ClearSelection,
  itemIsSelected,
  selectedRows,
  selectionIsEmpty,
  SetSelection,
} from './redux/ducks/list';

import * as TreeActions from './redux/ducks/tree';
import { selectedTreeNodeIdentifiers } from './redux/ducks/tree';
import { Typo3Node } from '../../../packages/filetree/src/lib/typo3-node';
import { orderBy } from 'lodash-es';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { addSlotToRawHtml } from './lib/utils';
import { Typo3Card } from '../../../packages/card/src/typo3-card';
import * as FileActions from './redux/ducks/file-actions';
import { getDragMode } from './redux/ducks/file-actions';
import * as GlobalActions from './redux/ducks/global-actions';
import { isLoading } from './redux/ducks/global-actions';
import { Action } from 'redux';
import { Typo3Filetree } from '../../../packages/filetree/src/typo3-filetree';
import { Typo3Draghandler } from '../../../packages/draghandler/src/typo3-draghandler';
import { Typo3FilesModal } from './typo3-files-modal';

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
    store.dispatch(new TreeActions.LoadTreeData(this.treeUrl));
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
    store.dispatch(new GlobalActions.Reload() as Action);
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
          style="flex: 1 1 ${this.state.layout.sidebarWidth + '%'}"
        >
          <div class="topbar-wrapper">
            <typo3-topbar>
              <div slot="left">
                <typo3-button
                  .disabled="${this.state.tree.selected == null}"
                  @click="${() =>
                    this.fileTree.addNode(
                      this.state.tree.selected!.identifier
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
                  .disabled="${this.state.tree.selected == null}"
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
            <typo3-topbar> ${this.getStorageDropDown()} </typo3-topbar>
          </div>
          <typo3-filetree
            .nodes="${this.state.tree.nodes}"
            .expandedNodeIds="${this.state.tree.expandedNodeIds}"
            .selectedNodeIds="${selectedTreeNodeIdentifiers(this.state.tree)}"
            ?editable="${true}"
            ?dragDropEnabled="${true}"
            ?inDropMode="${this.state.fileActions.isDraggingFiles}"
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
          style="flex: 1 1 ${100 - this.state.layout.sidebarWidth + '%'}"
          @typo3-dropzone-drop="${this._onDragAndDropFileUpload}"
          @typo3-dropzone-should-accept="${this._onDropZoneShouldAccept}"
        >
          <div class="topbar-wrapper">
            <typo3-topbar>
              <div slot="left">
                <typo3-button
                  @click="${this._onDownload}"
                  .disabled="${selectionIsEmpty(this.state.list) ||
                  this.state.fileActions.isDownloadingFiles}"
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
                  .disabled="${selectionIsEmpty(this.state.list)}"
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
                  .disabled="${selectionIsEmpty(this.state.list)}"
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
                  .disabled="${selectionIsEmpty(this.state.list)}"
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
                ${this.getSortingDropdown()} ${this.getViewModeDropDown()}
              </div>
            </typo3-topbar>
            <typo3-topbar>
              <typo3-breadcrumb slot="left">
                ${this.breadcrumbContent}
              </typo3-breadcrumb>
              <div slot="right">
                <typo3-selection-button
                  suffix="${this.translations['selected']}"
                  count="${this.state.list.selectedItemIds.length}"
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
    const nodes = TreeActions.selectedTreeBreadcrumb(
      this.state.tree
    ) as Typo3Node[];
    return nodes.map(
      node =>
        html` <typo3-breadcrumb-item slot="item" title="${node.name}">
        </typo3-breadcrumb-item>`
    );
  }

  protected get mainContent(): TemplateResult {
    if (this.state.list.items.length === 0) {
      if (true === isLoading(this.state)) {
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

    if (this.state.viewMode.mode === ViewMode.LIST) {
      return html` <typo3-datagrid
        class="main-content"
        style="width: 100%; overflow: auto;"
        draggable="${selectionIsEmpty(this.state.list) ? 'false' : 'true'}"
        @dragstart="${this._onDragStart}"
        schema="${JSON.stringify(this.listHeader)}"
        data="${JSON.stringify(this.state.list.items)}"
        editableColumns='["name"]'
        .selectedRows="${selectedRows(this.state.list)}"
        @typo3-datagrid-selection-change="${this._onDatagridSelectionChange}"
        @typo3-datagrid-contextmenu="${this._onContextMenu}"
        @typo3-datagrid-value-change="${(e: CustomEvent) =>
          this._onRename(e.detail.data.identifier, e.detail.data.name)}"
      ></typo3-datagrid>`;
    }

    const orderedData = orderBy(
      this.state.list.items,
      ['type', this.state.viewMode.order.field],
      ['asc', this.state.viewMode.order.direction]
    );
    const hash = orderedData.map(item => item.identifier).join(',');

    return html`<typo3-grid
      class="main-content"
      hash="${hash}"
      selectable
      @dragstart="${this._onDragStart}"
      draggable="${selectionIsEmpty(this.state.list) ? 'false' : 'true'}"
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
      ?selected="${itemIsSelected(this.state.list)(listData.identifier)}"
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
          value="${ViewMode.LIST}"
          ?selected="${this.state.viewMode.mode === ViewMode.LIST}"
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
          value="${ViewMode.TILES}"
          ?selected="${this.state.viewMode.mode === ViewMode.TILES}"
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
      ${isLoading(this.state)
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
          .disabled="${this.state.viewMode.mode === ViewMode.LIST}"
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
                ?selected="${this.state.viewMode.order.field ===
                listHeader.name}"
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
              ?selected="${this.state.viewMode.order.direction ===
              sortDir.name}"
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
      <typo3-dropdown slot="left" activatable>
        <typo3-dropdown-button slot="button" color="default">
          ${unsafeHTML(addSlotToRawHtml(selectedStorage!.icon, 'icon'))}
          ${selectedStorage!.name}
        </typo3-dropdown-button>
        ${this.storages.map(
          storage => html`
            <typo3-dropdown-item
              ?selected="${storage.uid === this.selectedStorageUid}"
            >
              ${unsafeHTML(addSlotToRawHtml(storage!.icon, 'icon'))}
              <a href="${storage.storageUrl}"> ${storage.name} </a>
            </typo3-dropdown-item>
          `
        )}
      </typo3-dropdown>
    `;
  }

  protected getDragHandler(): TemplateResult {
    let iconUrl = this.iconUrls['moveTo'];
    let message = this.translations['dnd.move.message'];
    let title = this.translations['dnd.move.title'];

    if ('copy' === getDragMode(this.state.fileActions)) {
      iconUrl = this.iconUrls['copyTo'];
      message = this.translations['dnd.copy.message'];
      title = this.translations['dnd.copy.title'];
    }

    title = title.replace(/%\w*/gm, '' + selectedRows(this.state.list).length);

    return html`
      <typo3-draghandler
        .hidden="${this.state.fileActions.isDraggingFiles !== true}"
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
      new SetSidebarWidth(
        Math.round((this.contentLeft.offsetWidth / width) * 100)
      )
    );
  }

  _onSelectedNode(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new TreeActions.SelectTreeNode(event.detail));
    store.dispatch(new ListActions.LoadListData(event.detail.folderUrl));
  }

  _onContextMenu(
    event: CustomEvent<{ event: MouseEvent; node: Typo3Node | ListItem }>
  ): void {
    event.detail.event.preventDefault();
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

  _onSelectViewMode(event: CustomEvent<SelectedDetail>): void {
    store.dispatch(new SetViewMode(event.detail.index as ViewMode));
  }

  _onSelectSortField(field: string): void {
    store.dispatch(new SetSortOrderField(field));
  }

  _onSelectSortDirection(direction: string): void {
    store.dispatch(new SetSortOrderDirection(direction));
  }

  _onClearSelection(): void {
    store.dispatch(new ClearSelection());
  }

  _onDatagridSelectionChange(event: CustomEvent<ListItem[]>): void {
    store.dispatch(new SetSelection(event.detail.map(row => row.identifier)));
  }

  _onCardgridSelectionChange(event: CustomEvent<Typo3Card[]>): void {
    store.dispatch(
      new SetSelection(
        event.detail.map((element: Typo3Card) => '' + element.value)
      )
    );
  }

  _onNodeExpand(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new TreeActions.ExpandTreeNode(event.detail));
  }

  _onNodeCollapse(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new TreeActions.CollapseTreeNode(event.detail));
  }

  _onDeleteClicked(): void {
    const action = new FileActions.DeleteFiles(
      selectedRows(this.state.list).map(data => data.identifier),
      this.fileActionUrl
    ) as Action;

    store.dispatch(action);
  }

  _onRename(identifier: string, name: string): void {
    store.dispatch(
      new FileActions.RenameFile(identifier, name, this.fileActionUrl)
    );
  }

  _onFolderAdd(node: Typo3Node, parentNode: Typo3Node): void {
    store.dispatch(
      new FileActions.AddFolder(node, parentNode, this.fileActionUrl)
    );
  }

  _onDialogFileUpload(): void {
    const currentNode = this.state.tree.selected;
    const dataTransfer = {
      files: this.fileUploadInput.files,
    };

    const action = new FileActions.UploadFiles(
      dataTransfer as DataTransfer,
      currentNode as Typo3Node,
      this.fileActionUrl
    ) as Action;

    store.dispatch(action);
  }

  _onDragAndDropFileUpload(event: CustomEvent<DragEvent>): void {
    const currentNode = this.state.tree.selected;
    const action = new FileActions.UploadFiles(
      event.detail.dataTransfer as DataTransfer,
      currentNode as Typo3Node,
      this.fileActionUrl
    ) as Action;

    store.dispatch(action);
  }

  _onDropZoneShouldAccept(event: CustomEvent<DragEvent>): void {
    const currentNode = this.state.tree.selected;
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
      option: { callbackAction: string };
    }>
  ): void {
    const contextItem = event.detail.contextItem;
    const type =
      Object.prototype.hasOwnProperty.call(contextItem, 'type') &&
      contextItem.type !== 'Folder'
        ? '_FILE'
        : '_FOLDER';
    const identifier = contextItem.identifier;

    let storeAction: Action | null = null;

    switch (event.detail.option.callbackAction) {
      case 'openInfoPopUp':
        storeAction = new FileActions.ShowFileInfo(identifier, type);
        break;
      case 'deleteFile':
        storeAction = new FileActions.DeleteFiles(
          [identifier],
          this.fileActionUrl
        );
        break;
      case 'createFile':
        this.fileTree.addNode(identifier);
        break;
      case 'copyFile':
        storeAction = new FileActions.ClipboardCopyFile(
          contextItem.clipboardIdentifier,
          identifier
        );
        break;
      case 'copyReleaseFile':
        storeAction = new FileActions.ClipboardCopyReleaseFile(
          contextItem.clipboardIdentifier
        );
        break;
      case 'cutFile':
        storeAction = new FileActions.ClipboardCutFile(
          contextItem.clipboardIdentifier,
          identifier
        );
        break;
      case 'cutReleaseFile':
        storeAction = new FileActions.ClipboardCutReleaseFile(
          contextItem.clipboardIdentifier
        );
        break;
      case 'pasteFileInto':
        storeAction = new FileActions.ClipboardPaste(
          identifier,
          this.fileActionUrl
        );
        break;
      case 'editFileStorage':
        storeAction = new FileActions.EditFileStorage(identifier);
        break;
      default:
        console.info('Todo: Implement cb action', event.detail.option);
    }

    if (null !== storeAction) {
      store.dispatch(storeAction);
    }
  }

  _onDragStart(e: DragEvent): void {
    store.dispatch(new FileActions.DragFilesStart());
    const dummyElement = document.createElement('div');
    dummyElement.textContent = '.';
    dummyElement.style.position = 'absolute';

    document.body.appendChild(dummyElement);
    e.dataTransfer!.setDragImage(dummyElement, 0, 0);
  }

  _onTreeNodeDrop(e: CustomEvent<{ event: DragEvent; node: Typo3Node }>): void {
    const identifiers = selectedRows(this.state.list).map(
      (listItem: ListItem) => listItem.identifier
    );
    store.dispatch(new FileActions.DragFilesEnd());

    const action =
      this.state.fileActions.dragFilesMode === 'copy'
        ? new FileActions.CopyFiles(
            identifiers,
            e.detail.node,
            this.fileActionUrl
          )
        : new FileActions.MoveFiles(
            identifiers,
            e.detail.node,
            this.fileActionUrl
          );
    store.dispatch(action);
  }

  _onDragLeave(): void {
    store.dispatch(new FileActions.DragFilesEnd());
  }

  _onDragOver(e: DragEvent): void {
    const dragMode = e.ctrlKey == true ? 'copy' : 'move';
    if (dragMode != getDragMode(this.state.fileActions)) {
      store.dispatch(new FileActions.DragFilesChangeMode(dragMode));
    }
    this.filesDragHandler.style.top = e.offsetY + 10 + 'px';
    this.filesDragHandler.style.left = e.offsetX + 'px';
  }

  _showFilesModalDialog(mode: 'copy' | 'move'): void {
    this.moveFilesModal.nodes = this.state.tree.nodes;
    this.moveFilesModal.expandedNodeIds = this.state.tree.expandedNodeIds;
    this.moveFilesModal.selectedFiles = selectedRows(this.state.list);
    this.moveFilesModal.mode = mode;
    this.moveFilesModal.show();
  }

  _onMoveFilesModal(
    e: CustomEvent<{ mode: string; files: ListItem[]; target: Typo3Node }>
  ): void {
    const action =
      e.detail.mode === 'copy'
        ? new FileActions.CopyFiles(
            e.detail.files.map(item => item.identifier),
            e.detail.target,
            this.fileActionUrl
          )
        : new FileActions.MoveFiles(
            e.detail.files.map(item => item.identifier),
            e.detail.target,
            this.fileActionUrl
          );

    store.dispatch(action);
  }

  _onDownload(): void {
    const identifiers = selectedRows(this.state.list).map(
      item => item.identifier
    );
    const action = new FileActions.DownloadFiles(identifiers);
    store.dispatch(action);
  }

  _onTreeNodeMove(
    event: CustomEvent<{ event: DragEvent; node: Typo3Node; target: Typo3Node }>
  ): void {
    const action = new FileActions.MoveFiles(
      [event.detail.node.identifier],
      event.detail.target,
      this.fileActionUrl
    );
    store.dispatch(action);
  }
}
