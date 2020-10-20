import {
  customElement,
  html,
  internalProperty,
  LitElement,
  query,
  TemplateResult,
} from 'lit-element';
import { store } from './redux/store';
import { connect } from 'pwa-helpers';
import { FileStorageState, ViewMode } from './redux/reducer';
import { SelectedDetail } from '@material/mwc-list/mwc-list-foundation';
import { setSidebarWidth, setViewMode } from './redux/actions';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-filestorage.pcss';

@customElement('typo3-filestorage')
export class Typo3Filestorage extends connect(store)(LitElement) {
  @internalProperty() private state!: FileStorageState;

  @query('.content_left') contentLeft!: HTMLElement;
  @query('.content_right') contentRight!: HTMLElement;

  public static styles = [themeStyles, styles];

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
          <div class="topbar-wrapper"></div>
          <typo3-filetree
            nodes='
          [
            {
              "stateIdentifier": "0_0",
              "identifier": 0,
              "depth": 0,
              "tip": "id=0",
              "icon": "apps-pagetree-page-shortcut-root",
              "name": "New TYPO3 site",
              "nameSourceField": "title",
              "mountPoint": 0,
              "workspaceId": 0,
              "siblingsCount": 1,
              "siblingsPosition": 1,
              "allowDelete": true,
              "allowEdit": true,
              "hasChildren": true,
              "isMountPoint": true,
              "loaded": true
            },
            {
              "stateIdentifier": "0_1",
              "identifier": 1,
              "depth": 1,
              "tip": "id=1 - Hidden",
              "icon": "apps-pagetree-folder-default",
              "name": "Dummy Page",
              "nameSourceField": "title",
              "mountPoint": 0,
              "workspaceId": 1,
              "siblingsCount": 1,
              "siblingsPosition": 1,
              "allowDelete": true,
              "allowEdit": true,
              "overlayIcon": "overlay-hidden"
            }
          ]
        '
          ></typo3-filetree>
        </div>
        <typo3-dropzone
          class="content_right"
          style="flex: 1 1 ${100 - this.state.layout.sidebarWidth}%"
        >
          <div class="topbar-wrapper">
            <typo3-topbar style="padding-top: 2rem;">
              <div slot="left">
                <typo3-button>
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
                <typo3-button>
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
                <typo3-button>
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
                <typo3-button>
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
                <typo3-dropdown activatable>
                  <typo3-dropdown-button slot="button" color="default">
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
                  <typo3-dropdown-item>
                    <span>Name</span>
                  </typo3-dropdown-item>
                </typo3-dropdown>
                <typo3-dropdown
                  activatable
                  @selected="${this._onSelectedViewMode}"
                >
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
                    ?selected="${this.state.viewMode === ViewMode.LIST}"
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
                    ?selected="${this.state.viewMode === ViewMode.TILES}"
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
              </div>
            </typo3-topbar>
            <typo3-breadcrumb>
              <typo3-breadcrumb-item
                slot="item"
                title="root"
              ></typo3-breadcrumb-item>
              <typo3-breadcrumb-item
                slot="item"
                title="root"
              ></typo3-breadcrumb-item>
            </typo3-breadcrumb>
          </div>
          ${this.mainContent}
        </typo3-dropzone>
      </typo3-splitpane>
      <typo3-context-menu></typo3-context-menu>
    `;
  }

  protected get mainContent(): TemplateResult {
    if (this.state.viewMode === ViewMode.LIST) {
      return html` <typo3-datagrid
        schema='[{"name":"icon", "type":"html", "width":"24", "title":" "}, {"name":"title", "title":"The Title"}, {"name":"description", "title":"The Description"}, {"name":"foo", "title":"The Foo"}]'
        data='[
        {
          "icon": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16 16\\" width=\\"16\\" height=\\"16\\" style=\\"padding:4px;\\"><g><path fill=\\"#FFC857\\" d=\\"M16 4v10H0V2h7l1.33 2H16z\\"/><path fill=\\"#E8A33D\\" d=\\"M16 5H8.33L7 7H0V4h16v1z\\"/></g></svg>",
          "title": "row 1 column 1",
          "description": "row 1 column 2",
          "foo": "row 1 column 3"
        },
        {
          "icon": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16 16\\" width=\\"16\\" height=\\"16\\" style=\\"padding:4px;\\"><g><path fill=\\"#AAA\\" d=\\"M16 4v10H0V2h7l1.3 2H16z\\"/><path opacity=\\".43\\" d=\\"M16 5H8.3L7 7H0V4h16v1z\\"/></g></svg>",
          "title": "row 2 column 1",
          "description": "row 2 column 2",
          "foo": "row 3 column 3"
        },
        {
          "icon": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16 16\\" width=\\"16\\" height=\\"16\\" style=\\"padding:4px;\\"><g><path fill=\\"#FFC857\\" d=\\"M16 4v10H0V2h7l1.33 2H16z\\"/><path fill=\\"#E8A33D\\" d=\\"M16 5H8.33L7 7H0V4h16v1z\\"/></g></svg>",
          "title": "row 3 column 1",
          "description": "row 3 column 2",
          "foo": "row 3 column 3"
        },
        {
          "icon": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16 16\\" width=\\"16\\" height=\\"16\\" style=\\"padding:4px;\\"><g><path fill=\\"#AAA\\" d=\\"M16 4v10H0V2h7l1.3 2H16z\\"/><path opacity=\\".43\\" d=\\"M16 5H8.3L7 7H0V4h16v1z\\"/></g></svg>",
          "title": "row 4 column 1",
          "description": "row 4 column 2",
          "foo": "row 4 column 3"
        },
        {
          "icon": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16 16\\" width=\\"16\\" height=\\"16\\" style=\\"padding:4px;\\"><g><path fill=\\"#FFC857\\" d=\\"M16 4v10H0V2h7l1.33 2H16z\\"/><path fill=\\"#E8A33D\\" d=\\"M16 5H8.33L7 7H0V4h16v1z\\"/></g></svg>",
          "title": "row 5 column 1",
          "description": "row 5 column 2",
          "foo": "row 5 column 3"
        },
        {
          "icon": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16 16\\" width=\\"16\\" height=\\"16\\" style=\\"padding:4px;\\"><g><path fill=\\"#AAA\\" d=\\"M16 4v10H0V2h7l1.3 2H16z\\"/><path opacity=\\".43\\" d=\\"M16 5H8.3L7 7H0V4h16v1z\\"/></g></svg>",
          "title": "row 6 column 1",
          "description": "row 6 column 2",
          "foo": "row 6 column 3"
        }
      ]'
      ></typo3-datagrid>`;
    }

    return html` <typo3-grid>
      <typo3-card selectable title="Card 1" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 2" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 3" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 4" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 5" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 6" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 7" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 8" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card selectable title="Card 9" subtitle="Dec 6, 2017"></typo3-card>
      <typo3-card
        selectable
        title="Card 10"
        subtitle="Dec 6, 2017"
      ></typo3-card>
    </typo3-grid>`;
  }

  stateChanged(state: FileStorageState): void {
    this.state = state;
  }

  _onSplitterDragend(event: CustomEvent): void {
    const width = this.contentLeft.offsetWidth + this.contentRight.offsetWidth;
    store.dispatch(
      setSidebarWidth(Math.round((this.contentLeft.offsetWidth / width) * 100))
    );
  }

  _onSelectedViewMode(event: CustomEvent<SelectedDetail>): void {
    store.dispatch(setViewMode(event.detail.index as ViewMode));
  }
}
