import {
  customElement,
  html,
  internalProperty,
  LitElement,
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
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { SetSidebarWidth } from './redux/ducks/layout';
import {
  AddSelectionItem,
  ClearSelection,
  fetchListData,
  itemIsSelected,
  RemoveSelectionItem,
  selectedRows,
  selectionIsEmpty,
  SetSelection,
} from './redux/ducks/list';
import {
  fetchTree,
  selectedTreeNodes,
  SelectTreeNode,
} from './redux/ducks/tree';
import { Typo3Node } from '../../../packages/filetree/src/lib/typo3-node';
import { orderBy } from 'lodash-es';

@customElement('typo3-filestorage')
export class Typo3Filestorage extends connect(store)(LitElement) {
  @internalProperty() private state!: RootState;

  @query('.content_left') contentLeft!: HTMLElement;
  @query('.content_right') contentRight!: HTMLElement;

  public static styles = [themeStyles, styles];

  protected listHeader = [
    { name: 'id', type: 'text', title: ' ', hidden: true },
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

    store.dispatch(fetchTree());
  }

  protected render(): TemplateResult {
    return html`
      <typo3-splitpane
        @splitter-dragend="${this._onSplitterDragend}"
        style="height: 100%;"
      >
        <div
          class="content_left"
          style="flex: 1 1 ${this.state.layout.sidebarWidth}%"
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
            <typo3-topbar></typo3-topbar>
          </div>
          <typo3-filetree
            style="flex: 1;"
            .nodes="${this.state.tree.nodes}"
            @typo3-node-selected="${this._onSelectedNode}"
            @typo3-node-context-menu="${this._onContextMenu}"
          ></typo3-filetree>
        </div>
        <typo3-dropzone
          class="content_right"
          style="flex: 1 1 ${100 - this.state.layout.sidebarWidth}%"
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
                <typo3-button .disabled="${selectionIsEmpty(this.state.list)}">
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
                <typo3-button .disabled="${selectionIsEmpty(this.state.list)}">
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
                <typo3-button .disabled="${selectionIsEmpty(this.state.list)}">
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
      <typo3-context-menu></typo3-context-menu>
    `;
  }

  protected get breadcrumbContent(): TemplateResult[] {
    const nodes = selectedTreeNodes(this.state.tree) as Typo3Node[];
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
        style="width: 100%; overflow: scroll"
        schema="${JSON.stringify(this.listHeader)}"
        data="${JSON.stringify(this.state.list.items)}"
        .selectedRows="${selectedRows(this.state.list)}"
        @typo3-datagrid-selection-change="${this._onSelectionChange}"
      ></typo3-datagrid>`;
    }

    const orderedData = orderBy(
      this.state.list.items,
      [this.state.viewMode.order.field],
      [this.state.viewMode.order.direction]
    );
    return html`<typo3-grid>
      ${orderedData.map(listData => {
        // hack for displaying svg for elements
        let rawSVG = listData.icon;
        rawSVG = rawSVG.replace('<svg ', '<svg slot="image" ');
        return html` <typo3-card
          ?selected="${itemIsSelected(this.state.list)(listData.id)}"
          value="${listData.id}"
          @typo3-card-selected="${this._onAddSelectionItem}"
          @typo3-card-unselected="${this._onRemoveSelectionItem}"
          selectable
          title="${listData.name}"
          subtitle="${listData.modified}"
          >${unsafeSVG(rawSVG)}
        </typo3-card>`;
      })}
    </typo3-grid>`;
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
      ${this.state.tree.loading || this.state.list.loading
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

  _onSplitterDragend(): void {
    const width = this.contentLeft.offsetWidth + this.contentRight.offsetWidth;
    store.dispatch(
      new SetSidebarWidth(
        Math.round((this.contentLeft.offsetWidth / width) * 100)
      )
    );
  }

  _onSelectedNode(event: CustomEvent<Typo3Node>): void {
    store.dispatch(new SelectTreeNode(event.detail));
    store.dispatch(fetchListData(event.detail.identifier));
  }

  _onContextMenu(
    event: CustomEvent<{ event: MouseEvent; node: Typo3Node }>
  ): void {
    event.detail.event.preventDefault();
    const nodeId = event.detail.node.identifier;
    const url =
      'https://7cb51cd8-619b-460e-bea8-e4b2a771548c.mock.pstmn.io/typo3/index.php?route=%2Fajax%2Fcontext-menu&token=3635781b1d39b3c2188c38f6917396d897b67003&table=sys_file&uid=' +
      nodeId;
    fetch(url)
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
            },
          })
        );
      })
      .catch((error: Error) => {
        console.log('todo: handle error on loading context-menu options');
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

  _onAddSelectionItem(event: CustomEvent): void {
    store.dispatch(new AddSelectionItem(event.detail.value));
  }

  _onRemoveSelectionItem(event: CustomEvent): void {
    store.dispatch(new RemoveSelectionItem(event.detail.value));
  }

  _onClearSelection(): void {
    store.dispatch(new ClearSelection());
  }

  _onSelectionChange(event: CustomEvent<ListItem[]>): void {
    store.dispatch(new SetSelection(event.detail.map(row => row.id)));
  }
}
