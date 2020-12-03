import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import defaultStyles from './typo3-filestorage.pcss';
import styles from './typo3-storages.pcss';
import { Storage } from './types/Storage';
import { addSlotToRawHtml } from './lib/utils';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

@customElement('typo3-storages')
export class Typo3Storages extends LitElement {
  @property({ type: Array }) private storages: Storage[] = [];
  @property({ type: Object }) translations: { [key: string]: string } = {};
  @property({ type: Object }) iconUrls: { [key: string]: string } = {};
  @property({ type: String }) switchUserUrl!: string;
  @property({ type: String }) newStorageUrl!: string;
  @property({ type: String }) userName!: string;

  public static styles = [themeStyles, defaultStyles, styles];

  protected render(): TemplateResult {
    return html`
      <div class="content_left">
        <div class="topbar-wrapper">
          <typo3-topbar>
            <div slot="left">
              <typo3-button @click="${this._onNewStorage}" slot="left">
                <svg slot="icon">
                  <use xlink:href="" xlink:href="${this.iconUrls['new']}"></use>
                </svg>
                ${this.translations['new']}
              </typo3-button>
            </div>
          </typo3-topbar>
          <typo3-topbar>
            <span slot="left">${this.translations['myStorages']}</span>
          </typo3-topbar>
        </div>
        ${this.renderContent()}
      </div>
    `;
  }

  protected renderContent(): TemplateResult {
    if (0 === this.storages.length) {
      return html` <typo3-modal id="modal" open="true">
        <h2>${this.translations['storagesAccessDeniedTitle']}</h2>
        <p>${this.translations['storagesAccessDeniedMessage']}</p>
        <p>
          <strong>${this.translations['userName']}</strong> ${this.userName}
        </p>
        <div
          slot="footer"
          style="display: flex;width: 100%;align-items: center;flex-direction: column; gap: 10px;"
        >
          <typo3-button
            onclick="modal.close()"
            @click="${this._onSwitchUser}"
            style="width: 100%"
            >${this.translations[
              'storagesAccessDeniedSwitchUser'
            ]}</typo3-button
          >
          <typo3-button
            color="success"
            @click="${this._onRefresh}"
            style="width: 100%"
          >
            ${this.translations['storagesAccessDeniedRefresh']}
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="" xlink:href="${this.iconUrls['refresh']}"></use>
            </svg>
          </typo3-button>
        </div>
      </typo3-modal>`;
    }

    return html` <div class="main-content">
      <typo3-alert color="info"
        >${this.translations['selectStorageInfo']}</typo3-alert
      >
      <typo3-grid>
        ${this.storages.map(storage => this.renderStoragCard(storage))}
      </typo3-grid>
    </div>`;
  }

  protected renderStoragCard(storage: Storage): TemplateResult {
    const rawIcon = addSlotToRawHtml(storage.icon, 'image');

    return html` <a href="${storage.storageUrl}" slot="item">
      <typo3-card title="${storage.name}" subtitle="${storage.type}">
        ${unsafeHTML(rawIcon)}
      </typo3-card></a
    >`;
  }

  _onRefresh(): void {
    window.location.reload();
  }

  _onSwitchUser(): void {
    window.location.href = this.switchUserUrl;
  }

  _onNewStorage(): void {
    window.location.href = this.newStorageUrl;
  }
}
