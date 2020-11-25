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
import {
  ClearSelection,
  itemIsSelected,
  selectedRows,
  selectionIsEmpty,
  SetSelection,
} from './redux/ducks/list';
import * as ListActions from './redux/ducks/list';

import * as TreeActions from './redux/ducks/tree';
import { Typo3Node } from '../../../packages/filetree/src/lib/typo3-node';
import { orderBy } from 'lodash-es';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { addSlotToRawHtml } from './lib/utils';
import { Typo3Card } from '../../../packages/card/src/typo3-card';
import * as FileActions from './redux/ducks/file-actions';
import * as GlobalActions from './redux/ducks/global-actions';
import { Action } from 'redux';
import { Typo3Filetree } from '../../../packages/filetree/src/typo3-filetree';
import { isLoading } from './redux/ducks/global-actions';
import { Typo3FilesDraghandler } from '../../../packages/draghandler/src/typo3-files-draghandler';
import { getDragMode } from './redux/ducks/file-actions';
import { Typo3MoveFilesModal } from './typo3-files-modal';

@customElement('typo3-filestorage')
export class Typo3Filestorage extends connect(store)(LitElement) {
  @property({ type: String }) treeUrl!: string;
  @property({ type: String }) fileActionUrl!: string;

  @property({ type: Array }) private storages: {
    storageUrl: string;
    name: string;
    uid: number;
    icon: string;
  }[] = [];

  @property({ type: Number }) private selectedStorageUid = 0;

  @internalProperty() private state!: RootState;

  @query('.content_left') contentLeft!: HTMLElement;
  @query('.content_right') contentRight!: HTMLElement;

  @query('typo3-filetree') fileTree!: Typo3Filetree;
  @query('typo3-files-draghandler') filesDragHandler!: Typo3FilesDraghandler;
  @query('typo3-files-modal') moveFilesModal!: Typo3MoveFilesModal;

  public static styles = [themeStyles, styles];

  protected listHeader = [
    { name: 'uid', type: 'text', title: ' ', hidden: true },
    { name: 'icon', type: 'html', title: ' ', width: '24' },
    { name: 'name', title: 'Name', sortable: true },
    { name: 'modified', title: 'Modified', width: '150', sortable: true },
    { name: 'size', title: 'Size', width: '100', sortable: true },
    { name: 'type', title: 'Type', width: '150' },
    { name: 'variants', title: 'Variants', width: '100' },
    { name: 'references', title: 'References', width: '100' },
    { name: 'rw', title: 'RW', width: '50' },
  ];

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
                <typo3-button>
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g class="icon-color">
                      <path
                        d="M12.5 9H9v3.5c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5V9H3.5c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5H7V3.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5V7h3.5c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5z"
                      />
                    </g>
                  </svg>
                  New
                </typo3-button>
                <typo3-button>
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g class="icon-color">
                      <path
                        d="M10 11h1v1h-1zM12 11h1v1h-1zM11.27 6H4.73a.25.25 0 01-.188-.414l3.27-3.743a.244.244 0 01.377 0l3.27 3.743A.25.25 0 0111.27 6z"
                      />
                      <path
                        d="M14.5 9H10v1h4v3H2v-3h4V9H1.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z"
                      />
                      <path d="M7 6h2v4H7z" />
                    </g>
                  </svg>
                  Upload
                </typo3-button>
              </div>
            </typo3-topbar>
            <typo3-topbar> ${this.getStorageDropDown()} </typo3-topbar>
          </div>
          <typo3-filetree
            ?inDropMode="${this.state.fileActions.isDraggingFiles}"
            @typo3-node-drop="${this._onTreeNodeDrop}"
            .nodes="${this.state.tree.nodes}"
            .expandedNodeIds="${this.state.tree.expandedNodeIds}"
            @typo3-node-select="${this._onSelectedNode}"
            @typo3-node-contextmenu="${this._onContextMenu}"
            @typo3-node-expand="${this._onNodeExpand}"
            @typo3-node-collapse="${this._onNodeCollapse}"
            @typo3-node-rename="${(e: CustomEvent) =>
              this._onRename(e.detail.node.identifier, e.detail.name)}"
            @typo3-node-add="${(e: CustomEvent) =>
              this._onFolderAdd(e.detail.node, e.detail.parentNode)}"
          ></typo3-filetree>
        </div>
        <typo3-dropzone
          class="content_right"
          style="flex: 1 1 ${100 - this.state.layout.sidebarWidth + '%'}"
          @typo3-dropzone-drop="${this._onFileUpload}"
          @typo3-dropzone-should-accept="${this._onDropZoneShouldAccept}"
        >
          <div class="topbar-wrapper">
            <typo3-topbar>
              <div slot="left">
                <typo3-button .disabled="${selectionIsEmpty(this.state.list)}">
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g class="icon-color">
                      <path
                        d="M14.5 9h-3.973l-.874 1H14v3H2v-3h4.346l-.873-1H1.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z"
                      />
                      <path
                        d="M10 11h1v1h-1zM12 11h1v1h-1zM11.27 6H4.73a.25.25 0 00-.188.414l3.27 3.743a.244.244 0 00.377 0l3.27-3.743A.25.25 0 0011.27 6z"
                      />
                      <path d="M7 2h2v4H7z" />
                    </g>
                  </svg>
                  Download
                </typo3-button>
                <typo3-button
                  .disabled="${selectionIsEmpty(this.state.list)}"
                  @click="${this._onDeleteClicked}"
                >
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g class="icon-color">
                      <path d="M7 5H6v8h1zM10 5H9v8h1z" />
                      <path
                        d="M13 3h-2v-.75C11 1.56 10.44 1 9.75 1h-3.5C5.56 1 5 1.56 5 2.25V3H3v10.75c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25V3zm-7-.75A.25.25 0 016.25 2h3.5a.25.25 0 01.25.25V3H6v-.75zm6 11.5a.25.25 0 01-.25.25h-7.5a.25.25 0 01-.25-.25V4h8v9.75z"
                      />
                      <path d="M13.5 4h-11a.5.5 0 010-1h11a.5.5 0 010 1z" />
                    </g>
                  </svg>
                  Delete
                </typo3-button>
                <typo3-button
                  .disabled="${selectionIsEmpty(this.state.list)}"
                  @click="${() => this._showFilesModalDialog('move')}"
                >
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g class="icon-color">
                      <path
                        d="M14.823 7.823l-2.396-2.396a.25.25 0 00-.427.177V7H9V4h1.396a.25.25 0 00.177-.427L8.177 1.177a.25.25 0 00-.354 0L5.427 3.573A.25.25 0 005.604 4H7v3H4V5.604a.25.25 0 00-.427-.177L1.177 7.823a.25.25 0 000 .354l2.396 2.396A.25.25 0 004 10.396V9h3v3H5.604a.25.25 0 00-.177.427l2.396 2.396a.25.25 0 00.354 0l2.396-2.396a.25.25 0 00-.177-.427H9V9h3v1.396a.25.25 0 00.427.177l2.396-2.396a.25.25 0 000-.354z"
                      />
                    </g>
                  </svg>
                  Move to
                </typo3-button>
                <typo3-button
                  .disabled="${selectionIsEmpty(this.state.list)}"
                  @click="${() => this._showFilesModalDialog('copy')}"
                >
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g class="icon-color">
                      <path
                        d="M12.5 2H9.4c-.2-.6-.7-1-1.4-1s-1.2.4-1.4 1H3.5c-.3 0-.5.2-.5.5v12c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5v-12c0-.3-.2-.5-.5-.5zM8 1.8c.4 0 .8.3.8.8s-.4.7-.8.7-.7-.4-.7-.8.3-.7.7-.7zM12 14H4V3h1v.5c0 .3.2.5.5.5h5c.3 0 .5-.2.5-.5V3h1v11z"
                      />
                    </g>
                  </svg>
                  Copy to
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
      <typo3-files-draghandler
        style="position: absolute; top: -1000px:"
        numFiles="${selectedRows(this.state.list).length}"
        mode="${getDragMode(this.state.fileActions)}"
        .hidden="${this.state.fileActions.isDraggingFiles !== true}"
      ></typo3-files-draghandler>
      <typo3-files-modal
        @typo3-move-files="${this._onMoveFilesModal}"
      ></typo3-files-modal>
    `;
  }

  protected get breadcrumbContent(): TemplateResult[] {
    const nodes = TreeActions.selectedTreeNodes(this.state.tree) as Typo3Node[];
    return nodes.map(
      node =>
        html` <typo3-breadcrumb-item slot="item" title="${node.name}">
        </typo3-breadcrumb-item>`
    );
  }

  protected get mainContent(): TemplateResult {
    if (this.state.list.items.length === 0) {
      return html``;
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
          this._onRename(e.detail.data.uid, e.detail.data.name)}"
      ></typo3-datagrid>`;
    }

    const orderedData = orderBy(
      this.state.list.items,
      [this.state.viewMode.order.field],
      [this.state.viewMode.order.direction]
    );
    const hash = orderedData.map(item => item.uid).join(',');

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
      ?selected="${itemIsSelected(this.state.list)(listData.uid)}"
      value="${listData.uid}"
      title="${listData.name}"
      subtitle="${listData.modified}"
      variant="${listData.thumbnailUrl ? 'preview' : 'standard'}"
      ?titleEditable="${true}"
      @contextmenu="${contextMenuCallback}"
      @typo3-card-title-rename="${(e: CustomEvent) =>
        this._onRename(listData.uid, e.detail)}"
      >${imageSlot} ${badge}
    </typo3-card>`;
  }

  protected getViewModeDropDown(): TemplateResult {
    return html`
      <typo3-dropdown activatable @selected="${this._onSelectViewMode}">
        <typo3-dropdown-button slot="button" color="default">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <g class="icon-color">
              <path d="M13 2v12H3V2h10m1-1H2v14h12V1z" />
              <path
                d="M4 9h2v1H4zM7 9h2v1H7zM10 9h2v1h-2zM4 11h2v1H4zM7 11h2v1H7zM10 11h2v1h-2zM4 7h2v1H4zM7 7h2v1H7zM10 7h2v1h-2zM4 5h2v1H4zM7 5h2v1H7zM10 5h2v1h-2zM4 3h2v1H4zM7 3h2v1H7zM10 3h2v1h-2z"
              />
            </g>
          </svg>
          View
        </typo3-dropdown-button>
        <typo3-dropdown-item
          value="${ViewMode.LIST}"
          ?selected="${this.state.viewMode.mode === ViewMode.LIST}"
        >
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <g class="icon-color">
              <path
                d="M2 2h12v2H2zM2 5h10v1H2zM2 7h12v1H2zM2 9h10v1H2zM2 11h12v1H2zM2 13h10v1H2z"
              />
            </g>
          </svg>
          <span>List</span>
        </typo3-dropdown-item>
        <li divider></li>
        <typo3-dropdown-item
          value="${ViewMode.TILES}"
          ?selected="${this.state.viewMode.mode === ViewMode.TILES}"
        >
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <g class="icon-color">
              <path
                d="M6 2v4H2V2h4m.5-1h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zM14 10v4h-4v-4h4m.5-1h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zM6 10v4H2v-4h4m.5-1h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zM14 2v4h-4V2h4m.5-1h-5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5z"
              />
            </g>
          </svg>
          <span>Tiles</span>
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
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <g class="icon-color">
              <path d="M4 2h1v12H4z" />
              <path
                d="M6 12l-1.5 2L3 12H2l2.3 3c.1.1.3.1.4 0L7 12H6zM9 5h5V4H8v2h1zM9 8h3V7H8v2h1zM9 11h1v-1H8v2h1z"
              />
            </g>
          </svg>
          Sorting
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
          { title: 'Ascending', name: 'asc' },
          { title: 'Descending', name: 'desc' },
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
    store.dispatch(new SetSelection(event.detail.map(row => row.uid)));
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
      selectedRows(this.state.list).map(data => data.uid),
      this.fileActionUrl
    ) as Action;

    store.dispatch(action);
  }

  _onRename(uid: string, name: string): void {
    store.dispatch(new FileActions.RenameFile(uid, name, this.fileActionUrl));
  }

  _onFolderAdd(node: Typo3Node, parentNode: Typo3Node): void {
    store.dispatch(
      new FileActions.AddFolder(node, parentNode, this.fileActionUrl)
    );
  }

  _onFileUpload(event: CustomEvent<DragEvent>): void {
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
    const uid = Object.prototype.hasOwnProperty.call(contextItem, 'identifier')
      ? contextItem.identifier
      : contextItem.uid;

    let storeAction: Action | null = null;

    switch (event.detail.option.callbackAction) {
      case 'openInfoPopUp':
        storeAction = new FileActions.ShowFileInfo(uid, type);
        break;
      case 'deleteFile':
        storeAction = new FileActions.DeleteFiles([uid], this.fileActionUrl);
        break;
      case 'createFile':
        this.fileTree.addNode(uid);
        break;
      case 'copyFile':
        storeAction = new FileActions.ClipboardCopyFile(uid);
        break;
      case 'cutFile':
        storeAction = new FileActions.ClipboardCutFile(uid);
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
      (listItem: ListItem) => listItem.uid
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
            e.detail.files.map(item => item.uid),
            e.detail.target,
            this.fileActionUrl
          )
        : new FileActions.MoveFiles(
            e.detail.files.map(item => item.uid),
            e.detail.target,
            this.fileActionUrl
          );

    store.dispatch(action);
  }
}
