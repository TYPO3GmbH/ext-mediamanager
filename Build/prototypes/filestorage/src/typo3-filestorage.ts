/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

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
import { ViewMode } from './redux/ducks/view-mode';
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
import {
  ContextMenuEvent,
  ContextMenuItemClickEvent,
  MoveFilesModalEvent,
  MoveTreeNodeEvent,
  TreeNodeDropEvent,
} from './types/events';
import { translate } from './services/translation.service';
import { styleMap } from 'lit-html/directives/style-map';
import { createSVGElement } from './lib/svg-helper';
import { ifDefined } from 'lit-html/directives/if-defined';
import { DatagridSorter } from './lib/datagrid-sorter';
import { ApiService } from './services/api.service';
import { catchError, map, take, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Typo3ContextMenuOption } from '../../../packages/menu/src/lib/Typo3ContextMenuOption';
import { CellHeader } from '../../../packages/datagrid/src/lib/cell-header';
import { getUrl } from './services/backend-url.service';
import * as _ from 'lodash-es';

@customElement('typo3-filestorage')
export class Typo3Filestorage extends connect(store)(LitElement) {
  @property({ type: Array }) storages: Storage[] = [];
  @property({ type: Number }) selectedStorageUid = 0;
  @property({ type: Boolean }) itemsDragDropEnabled = false;
  @property({ type: Boolean }) itemsEditEnabled = false;

  @internalProperty() state!: RootState;

  @query('.content_left') contentLeft!: HTMLElement;
  @query('.content_right') contentRight!: HTMLElement;
  @query('typo3-filetree') fileTree!: Typo3Filetree;
  @query('typo3-draghandler') filesDragHandler!: Typo3Draghandler;
  @query('typo3-files-modal') moveFilesModal!: Typo3FilesModal;
  @query('#file_upload') fileUploadInput!: HTMLInputElement;

  public static styles = [themeStyles, styles];

  private apiService: ApiService;

  constructor() {
    super();
    this.apiService = new ApiService();
  }

  public stateChanged(state: RootState): void {
    this.state = state;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dragend', this._onDragEnd);
    this.addEventListener('dragover', this._onDragOver);
    window.addEventListener('hashchange', this._onWindowHashChange);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dragend', this._onDragEnd);
    this.addEventListener('dragover', this._onDragOver);
    window.addEventListener('hashchange', this._onWindowHashChange);
  }

  refresh(): void {
    store.dispatch(new fromGlobalActions.Reload() as Action);
  }

  get datagridSchema(): CellHeader[] {
    const fields: CellHeader[] = [
      {
        name: 'identifier',
        type: 'text',
        title: ' ',
        hidden: true,
      },
      {
        name: 'icon',
        type: 'html',
        title: ' ',
        width: '24',
      },
      {
        name: 'name',
        title: translate('field.name'),
        sortable: true,
        minWidth: '150',
      },
      {
        name: 'modified',
        title: translate('field.modified'),
        width: '100',
        sortable: true,
        sortField: 'modifiedRaw',
      },
      {
        name: 'size',
        title: translate('field.size'),
        width: '100',
        sortable: true,
        sortField: 'sizeRaw',
      },
      {
        name: 'type',
        title: translate('field.type'),
        width: '100',
      },
      {
        name: 'variants',
        title: translate('field.variants'),
        width: '100',
      },
      {
        name: 'references',
        type: 'number',
        title: translate('field.references'),
        width: '100',
      },
      {
        name: 'rw',
        title: translate('field.rw'),
        width: '50',
      },
    ];

    if (fromList.isInSearchMode(this.state)) {
      fields.splice(2, 0, {
        name: 'path',
        title: translate('field.path'),
      });
    }

    return fields;
  }

  _onSplitterDragend(): void {
    dispatchEvent(new Event('resize'));

    const width = this.contentLeft.offsetWidth + this.contentRight.offsetWidth;
    store.dispatch(
      new fromLayout.SetSidebarWidth(
        Math.round((this.contentLeft.offsetWidth / width) * 100)
      )
    );
  }

  _onSelectedNode(node: Typo3Node): void {
    store.dispatch(new fromTree.SelectTreeNode(node.identifier));
    store.dispatch(new fromList.LoadListData(node.folderUrl));
  }

  _onContextMenu(
    event: ContextMenuEvent,
    context: 'list' | 'tree' = 'list'
  ): void {
    event.detail.event.preventDefault();
    event.detail.event.stopImmediatePropagation();

    const selectedItems = fromList.getSelectedItems(this.state);

    let contextItems = [event.detail.node];
    if (context === 'list' && selectedItems.length > 0) {
      // use selection if element is part of selection
      if (_.some(selectedItems, event.detail.node)) {
        contextItems = selectedItems;
      }
    }

    const url = getUrl('ajax_contextmenu', {
      table: 'sys_file',
      uid: contextItems.map(item => item.identifier).join(','),
    });

    this.apiService
      .getJSON<Typo3ContextMenuOption[]>(url)
      .pipe(
        take(1),
        map(options => this.filterContextMenuOptions(Object.values(options))),
        tap(options => {
          dispatchEvent(
            new CustomEvent('typo3-show-context-menu', {
              detail: {
                sourceEvent: event.detail.event,
                options: options,
                context: contextItems,
              },
            })
          );
        }),
        catchError(error => {
          console.log(
            'todo: handle error on loading context-menu options',
            error
          );
          return EMPTY;
        })
      )
      .subscribe();
  }

  _onContextMenuWithoutContext(event: MouseEvent): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    if (null === currentNode || fromList.isInSearchMode(this.state)) {
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
    const viewMode = Object.values(fromView.ViewMode)[event.detail.index];
    store.dispatch(new fromView.SetViewMode(viewMode as ViewMode));
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
    const identifiers = fromList
      .getSelectedItems(this.state)
      .map(data => data.identifier);
    store.dispatch(new fromFileActions.DeleteFilesConfirm(identifiers));
  }

  _onRename(identifier: string, name: string): void {
    store.dispatch(new fromFileActions.RenameFile(identifier, name));
  }

  _onFolderAdd(node: Typo3Node, parentNode: Typo3Node): void {
    store.dispatch(new fromFileActions.AddFolder(node, parentNode));
  }

  _onFileDialogUpload(): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    const dataTransfer = {
      files: this.fileUploadInput.files,
    };

    const action = new fromFileActions.UploadFiles(
      dataTransfer as DataTransfer,
      currentNode as Typo3Node
    ) as Action;

    store.dispatch(action);
  }

  _onDragAndDropFileUpload(event: CustomEvent<DragEvent>): void {
    const currentNode = fromTree.getSelectedTreeNode(this.state);
    const action = new fromFileActions.UploadFiles(
      event.detail.dataTransfer as DataTransfer,
      currentNode as Typo3Node
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

  _onContextMenuItemClick(event: ContextMenuItemClickEvent): void {
    const contextItems = event.detail.context;
    const contextItem: Typo3Node | ListItem = event.detail.context[0];
    const callbackAction = event.detail.option.callbackAction;
    const identifiers = contextItems.map(node => node.identifier);

    let storeAction: Action | null = null;

    const additionalAttributes = event.detail.option!.additionalAttributes;

    switch (callbackAction) {
      case 'openInfoPopUp':
        storeAction = new fromFileActions.ShowFileInfo(
          contextItem.identifier,
          contextItem.sysType
        );
        break;
      case 'showFile':
        storeAction = new fromFileActions.ShowFile(
          additionalAttributes!['data-url']
        );
        break;
      case 'deleteFile':
        storeAction = new fromFileActions.DeleteFilesConfirm(identifiers);
        break;
      case 'addFolder':
        this.fileTree.addNode(contextItem.identifier);
        break;
      case 'copyFile':
        storeAction = new fromFileActions.ClipboardCopyFile(contextItems);
        break;
      case 'cutFile':
        storeAction = new fromFileActions.ClipboardCutFile(contextItems);
        break;
      case 'pasteFileInto':
        storeAction = new fromFileActions.ClipboardPaste(
          contextItem.identifier
        );
        break;
      case 'editFileStorage':
        storeAction = new fromFileActions.EditFileStorage(
          contextItem.identifier
        );
        break;
      case 'replaceFile':
        storeAction = new fromFileActions.ReplaceFileConfirm(
          contextItem.identifier
        );
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

  _onTreeNodeDrop(e: TreeNodeDropEvent): void {
    const identifiers = fromList
      .getSelectedItems(this.state)
      .map((listItem: ListItem) => listItem.identifier);
    store.dispatch(new fromFileActions.DragFilesEnd());

    const action = fromFileActions.isCopyDragMode(this.state)
      ? new fromFileActions.CopyFiles(identifiers, e.detail.node)
      : new fromFileActions.MoveFiles(identifiers, e.detail.node);
    store.dispatch(action);
  }

  _onDragEnd(): void {
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

  _onMoveFilesModal(e: MoveFilesModalEvent): void {
    const action =
      e.detail.mode === 'copy'
        ? new fromFileActions.CopyFiles(
            e.detail.files.map(item => item.identifier),
            e.detail.target
          )
        : new fromFileActions.MoveFiles(
            e.detail.files.map(item => item.identifier),
            e.detail.target
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

  _onTreeNodeMove(event: MoveTreeNodeEvent): void {
    const action = new fromFileActions.MoveFiles(
      [event.detail.node.identifier],
      event.detail.target
    );
    store.dispatch(action);
  }

  _onItemDblClick(item: ListItem): void {
    if (item.sysType === '_FOLDER') {
      const treeNode = fromTree.getTreeNodeByIdentifier(this.state)(
        item.identifier
      );
      if (null !== treeNode) {
        this._onSelectedNode(treeNode);
      }
      return;
    }
    if (item.metaDataUrl) {
      store.dispatch(new fromFileActions.EditFileMetadata(item.metaDataUrl));
    }
  }

  _onFilesSearch(event: CustomEvent<string>): void {
    store.dispatch(new fromList.SearchTermChanged(event.detail));
  }

  _onToggleFileTree(): void {
    store.dispatch(new fromLayout.ToggleSidebar());
  }

  _orderItemsForCardgridView(listItems: ListItem[]): ListItem[] {
    return orderBy(
      listItems,
      [item => item.sysType === '_FOLDER', fromView.getSortField(this.state)],
      ['desc', fromView.getSortDirection(this.state)]
    );
  }

  _onWindowHashChange = (): void => {
    const hash = window.location.hash.replace('#', '');
    const node = fromTree.getTreeNodeByIdentifier(this.state)(hash);
    if (
      node &&
      node.identifier !== fromTree.getLastSelectedTreeNodeId(this.state)
    ) {
      store.dispatch(new fromTree.SelectTreeNode(node.identifier));
      store.dispatch(new fromList.LoadListData(node.folderUrl));
    }
  };

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    store.dispatch(new fromTree.LoadTreeData());
  }

  protected render(): TemplateResult {
    return html`
      <typo3-splitpane @splitter-dragend="${this._onSplitterDragend}">
        <div
          class="content_left"
          style=${styleMap({
            flex: '1 1 ' + fromLayout.getSidebarWidth(this.state) + '%',
            display: fromLayout.isSidebarVisible(this.state) ? '' : 'none',
          })}
        >
          <div class="topbar-wrapper">
            <typo3-topbar>
              <div slot="left">${this.renderStoragesDropDown}</div>
            </typo3-topbar>
            <typo3-topbar>
              <div slot="left">
                ${this.renderNewFolderButton} ${this.renderUploadButton}
              </div>
            </typo3-topbar>
          </div>
          ${this.renderFolderTree}
        </div>
        <typo3-dropzone
          class="content_right"
          style="${'flex: 1 1 ' +
          (100 - fromLayout.getSidebarWidth(this.state)) +
          '%'}"
          @typo3-dropzone-drop="${this._onDragAndDropFileUpload}"
          @typo3-dropzone-should-accept="${this._onDropZoneShouldAccept}"
        >
          <div slot="allowed-drop-message" class="dropzone-drop-message">
            <span class="dropzone-drop-message__title"
              >${translate('dragFiles.allowed.header')}</span
            >
            <span>${translate('dragFiles.allowed.message')}</span>
          </div>
          <div slot="denied-drop-message" class="dropzone-drop-message">
            <span class="dropzone-drop-message__title"
              >${translate('dragFiles.denied.header')}</span
            >
            <span>${translate('dragFiles.denied.message')}</span>
          </div>
          <div class="topbar-wrapper">
            <typo3-topbar>
              <div slot="left">
                ${this.renderTreeToggleButton} ${this.renderBreadcrumb}
              </div>
              <div slot="right">
                ${this.renderSearchField} ${this.renderSortingDropdown}
                ${this.renderViewModeDropDown}
              </div>
            </typo3-topbar>
            <typo3-topbar>
              <div slot="left">
                ${this.renderDownloadButton} ${this.renderDeleteButton}
                ${this.renderMoveToButton} ${this.renderCopyToButton}
              </div>
              <div slot="right">${this.renderSelectionButton}</div>
            </typo3-topbar>
          </div>
          ${this.renderMainContent}
        </typo3-dropzone>
      </typo3-splitpane>
      <typo3-context-menu
        @typo3-context-menu-item-click="${this._onContextMenuItemClick}"
      ></typo3-context-menu>
      ${this.renderDragHandler}
      <typo3-files-modal
        @typo3-move-files="${this._onMoveFilesModal}"
      ></typo3-files-modal>
    `;
  }

  protected get renderBreadcrumb(): TemplateResult {
    if (fromList.isInSearchMode(this.state)) {
      return html` ${translate('labels.search')}:
      "${fromList.getSearchTermString(this.state)}"`;
    }

    const nodes = fromTree.getSelectedTreeNodePath(this.state) as Typo3Node[];
    const itemsHtml = nodes.map(
      node =>
        html` <typo3-breadcrumb-item
          slot="item"
          title="${node.name}"
          @click="${() => this._onSelectedNode(node)}"
          ?active="${node === fromTree.getSelectedTreeNode(this.state)}"
        >
        </typo3-breadcrumb-item>`
    );

    return html`<typo3-breadcrumb>${itemsHtml}</typo3-breadcrumb>`;
  }

  protected get renderMainContent(): TemplateResult {
    const listItems = this.listItems;

    if (listItems.length === 0) {
      return this.renderEmptyContent;
    }

    if (fromView.isListMode(this.state)) {
      const sorters = DatagridSorter.getDatagridSorters(this.datagridSchema);
      return html` <typo3-datagrid
        class="main-content"
        draggable="${!this.itemsDragDropEnabled ||
        fromList.isEmptySelection(this.state)
          ? 'false'
          : 'true'}"
        .schema="${this.datagridSchema}"
        .data="${listItems}"
        .editableColumns="${this.itemsEditEnabled ? ['name'] : []}"
        .selectedRows="${fromList.getSelectedItems(this.state)}"
        .sorters="${sorters}"
        @dragstart="${this._onDragStart}"
        @contextmenu="${this._onContextMenuWithoutContext}"
        @typo3-datagrid-selection-change="${this._onDatagridSelectionChange}"
        @typo3-datagrid-contextmenu="${this._onContextMenu}"
        @typo3-datagrid-dblclick="${(e: CustomEvent) =>
          this._onItemDblClick(e.detail)}"
        @typo3-datagrid-value-change="${(e: CustomEvent) =>
          this._onRename(e.detail.data.identifier, e.detail.data.name)}"
      ></typo3-datagrid>`;
    }

    const orderedData = this._orderItemsForCardgridView(listItems);

    const hash = orderedData.map(item => item.identifier).join(',');

    return html`<typo3-grid
      class="main-content"
      hash="${hash}"
      selectable
      @contextmenu="${this._onContextMenuWithoutContext}"
      @typo3-grid-selection-changed="${this._onCardgridSelectionChange}"
      @click="${this._onClearSelection}"
    >
      ${orderedData.map(listData => this.renderCardContent(listData))}
    </typo3-grid>`;
  }

  protected renderCardContent(listData: ListItem): TemplateResult {
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
    let variant = 'file';

    if (listData.sysType === '_FOLDER') {
      const sizeNumeric = parseInt(listData.size.replace(/^\D+/g, ''), 10);
      badge = html`<span slot="badge">${sizeNumeric}</span>`;
      variant = 'folder';
    }

    const contextMenuCallback = (e: MouseEvent) => {
      this._onContextMenu(
        new CustomEvent('typo3-card-context-menu', {
          detail: { event: e, node: listData },
        })
      );
    };

    const isSelected = fromList.isItemSelected(this.state)(listData.identifier);

    return html` <typo3-card
      slot="item"
      ?disabled="${ifDefined(listData.disabled)}"
      ?notSelectable="${ifDefined(listData.notSelectable)}"
      ?selected="${isSelected}"
      value="${listData.identifier}"
      title="${listData.name}"
      subtitle="${listData.modified}"
      variant="${listData.thumbnailUrl ? 'preview' : variant}"
      ?titleEditable="${this.itemsEditEnabled && isSelected}"
      draggable="${
        !this.itemsDragDropEnabled || fromList.isEmptySelection(this.state)
          ? 'false'
          : 'true'
      }"
      @dragstart="${this._onDragStart}"
      @contextmenu="${contextMenuCallback}"
      @dblclick="${() => this._onItemDblClick(listData)}"
      @typo3-card-title-rename="${(e: CustomEvent) =>
        this._onRename(listData.identifier, e.detail)}"
    >
      ${createSVGElement(
        isSelected ? 'actions-check-circle-alt' : 'actions-circle',
        'checkbox'
      )}
      </typo3-badge>
      ${imageSlot} ${badge}
    </typo3-card>`;
  }

  protected get renderEmptyContent(): TemplateResult {
    if (true === fromGlobalActions.isLoading(this.state)) {
      return html``;
    }
    let iconKey = 'lockedFolder';
    let titleKey = 'emptyFolder';
    let messageKey = 'readOnlyFolder';

    const currentNode = fromTree.getSelectedTreeNode(this.state);

    if (fromList.isInSearchMode(this.state)) {
      iconKey = 'search';
      titleKey = 'fileSearch.noResults';
      messageKey = '';
    } else if (currentNode && currentNode.allowEdit) {
      iconKey = 'emptyFolder';
      messageKey = 'dragFiles.message.upload';
    }

    return html` <div class="main-content main-content-info">
      ${createSVGElement(iconKey)}
      <h3>${translate(titleKey)}</h3>
      <span>${translate(messageKey)}</span>
    </div>`;
  }

  protected get renderViewModeDropDown(): TemplateResult {
    return html`
      <typo3-dropdown activatable @selected="${this._onSelectViewMode}">
        <typo3-dropdown-button slot="button" color="default">
          ${createSVGElement('view.mode', 'icon')} ${translate('view.mode')}
        </typo3-dropdown-button>
        <typo3-dropdown-item
          value="${fromView.ViewMode.LIST}"
          ?selected="${fromView.isListMode(this.state)}"
        >
          ${createSVGElement('view.mode.list', 'icon')}
          <span>${translate('view.mode.list')}</span>
        </typo3-dropdown-item>
        <li divider></li>
        <typo3-dropdown-item
          value="${fromView.ViewMode.TILES}"
          ?selected="${fromView.isTilesMode(this.state)}"
        >
          ${createSVGElement('view.mode.tiles', 'icon')}
          <span>${translate('view.mode.tiles')}</span>
        </typo3-dropdown-item>
      </typo3-dropdown>
      ${fromGlobalActions.isLoading(this.state)
        ? html`<div class="loading"><typo3-spinner></typo3-spinner></div>`
        : html``}
    `;
  }

  protected get renderSortingDropdown(): TemplateResult {
    return html`
      <typo3-dropdown multi activatable>
        <typo3-dropdown-button
          slot="button"
          color="default"
          .disabled="${fromView.isListMode(this.state)}"
        >
          ${createSVGElement('view.sorting', 'icon')}
          <span>${translate('view.sorting')}</span>
        </typo3-dropdown-button>
        ${this.datagridSchema
          .filter(header => header.sortable === true)
          .map(listHeader => {
            const sortField = listHeader.sortField ?? listHeader.name;

            return html`
              <typo3-dropdown-item
                activated
                group="sort_field"
                ?selected="${fromView.isSortField(this.state)(sortField)}"
                value="${sortField}"
                @click="${() => this._onSelectSortField(sortField)}"
              >
                <span>${listHeader.title}</span>
              </typo3-dropdown-item>
            `;
          })}
        <li divider></li>
        ${[
          { title: translate('view.sortingdir.asc'), name: 'asc' },
          { title: translate('view.sortingdir.desc'), name: 'desc' },
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

  protected get renderDownloadButton(): TemplateResult {
    return html`
      <typo3-button
        @click="${this._onDownload}"
        .disabled="${fromList.isEmptySelection(this.state) ||
        fromFileActions.isDownloadingFiles(this.state)}"
      >
        ${createSVGElement('download', 'icon')} ${translate('download')}
      </typo3-button>
    `;
  }

  protected get renderDeleteButton(): TemplateResult {
    return html`
      <typo3-button
        .disabled="${fromList.isEmptySelection(this.state)}"
        @click="${this._onDeleteClicked}"
      >
        ${createSVGElement('delete', 'icon')} ${translate('delete')}
      </typo3-button>
    `;
  }

  protected get renderMoveToButton(): TemplateResult {
    return html`
      <typo3-button
        .disabled="${fromList.isEmptySelection(this.state)}"
        @click="${() => this._showFilesModalDialog('move')}"
      >
        ${createSVGElement('moveTo', 'icon')} ${translate('moveTo')}
      </typo3-button>
    `;
  }

  protected get renderCopyToButton(): TemplateResult {
    return html`
      <typo3-button
        .disabled="${fromList.isEmptySelection(this.state)}"
        @click="${() => this._showFilesModalDialog('copy')}"
      >
        ${createSVGElement('copyTo', 'icon')} ${translate('copyTo')}
      </typo3-button>
    `;
  }

  protected get renderSelectionButton(): TemplateResult {
    return html`
      <typo3-selection-button
        suffix="${translate('selected')}"
        count="${fromList.getSelectedItems(this.state).length}"
        @typo3-selection-clear="${this._onClearSelection}"
      ></typo3-selection-button>
    `;
  }

  protected get renderStoragesDropDown(): TemplateResult {
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

  protected get renderNewFolderButton(): TemplateResult {
    return html`
      <typo3-button
        .disabled="${fromTree.getSelectedTreeNode(this.state) == null}"
        @click="${() =>
          this.fileTree.addNode(
            fromTree.getSelectedTreeNode(this.state)?.identifier as string
          )}"
      >
        ${createSVGElement('addFolder', 'icon')} ${translate('new')}
      </typo3-button>
    `;
  }

  protected get renderUploadButton(): TemplateResult {
    return html`
      <typo3-button
        .disabled="${fromTree.getSelectedTreeNode(this.state) == null}"
        @click="${() => this.fileUploadInput.click()}"
      >
        ${createSVGElement('upload', 'icon')} ${translate('upload')}
      </typo3-button>
      <input
        type="file"
        id="file_upload"
        hidden
        multiple
        @change="${this._onFileDialogUpload}"
      />
    `;
  }

  protected get renderTreeToggleButton(): TemplateResult {
    const translationKey = fromLayout.isSidebarVisible(this.state)
      ? 'fileTree.collapse'
      : 'fileTree.expand';

    return html`
      <typo3-button
        title="${translate(translationKey)}"
        label="${translate(translationKey)}"
        @click="${this._onToggleFileTree}"
      >
        ${createSVGElement('toggleTree', 'icon')}
      </typo3-button>
    `;
  }

  protected get renderFolderTree(): TemplateResult {
    return html`
      <typo3-filetree
        .nodes="${fromTree.getTreeNodes(this.state)}"
        .expandedNodeIds="${fromTree.getExpandedTreeNodeIds(this.state)}"
        .selectedNodeIds="${fromTree.selectedTreeNodeIdentifiers(this.state)}"
        ?editable="${this.itemsEditEnabled}"
        ?dragDropEnabled="${this.itemsDragDropEnabled}"
        ?inDropMode="${fromFileActions.isDraggingFiles(this.state)}"
        @typo3-node-drop="${this._onTreeNodeDrop}"
        @typo3-node-select="${(e: CustomEvent<Typo3Node>) =>
          this._onSelectedNode(e.detail)}"
        @typo3-node-contextmenu="${e => this._onContextMenu(e, 'tree')}"
        @typo3-node-expand="${this._onNodeExpand}"
        @typo3-node-collapse="${this._onNodeCollapse}"
        @typo3-node-move="${this._onTreeNodeMove}"
        @typo3-node-rename="${(e: CustomEvent) =>
          this._onRename(e.detail.node.identifier, e.detail.name)}"
        @typo3-node-add="${(e: CustomEvent) =>
          this._onFolderAdd(e.detail.node, e.detail.parentNode)}"
      ></typo3-filetree>
    `;
  }

  protected get renderDragHandler(): TemplateResult {
    let iconKey = 'moveTo';
    let message = translate('dnd.move.message');
    let title = translate('dnd.move.title');

    if (fromFileActions.isCopyDragMode(this.state)) {
      iconKey = 'copyTo';
      message = translate('dnd.copy.message');
      title = translate('dnd.copy.title');
    }

    title = title.replace(
      /%\w*/gm,
      '' + fromList.getSelectedItems(this.state).length
    );

    return html`
      <typo3-draghandler
        .hidden="${fromFileActions.isDraggingFiles(this.state) !== true}"
      >
        ${createSVGElement(iconKey, 'icon')}
        <span slot="title">${title}</span>
        <span slot="message">${unsafeHTML(message)}</span>
      </typo3-draghandler>
    `;
  }

  protected get renderSearchField(): TemplateResult {
    return html`
      <typo3-search
        placeholder="${translate('labels.search')}"
        label="${translate('labels.search')}"
        value="${fromList.getSearchTermString(this.state)}"
        @typo3-search-change="${this._onFilesSearch}"
      >
        ${createSVGElement('search', 'search-icon')}
        ${createSVGElement('reset', 'reset-icon')}
      </typo3-search>
    `;
  }

  protected get listItems(): ListItem[] {
    return fromList.getItems(this.state);
  }

  protected filterContextMenuOptions(
    options: Typo3ContextMenuOption[]
  ): Typo3ContextMenuOption[] {
    return options;
  }
}
