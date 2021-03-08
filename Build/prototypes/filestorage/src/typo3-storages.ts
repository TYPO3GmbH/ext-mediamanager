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
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import defaultStyles from './typo3-filestorage.pcss';
import styles from './typo3-storages.pcss';
import { Storage } from './types/storage';
import { addSlotToRawHtml } from './lib/utils';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { translate } from './services/translation.service';
import { getUrl } from './services/backend-url.service';
import { createSVGElement } from './lib/svg-helper';

@customElement('typo3-storages')
export class Typo3Storages extends LitElement {
  public static styles = [themeStyles, defaultStyles, styles];

  @property({ type: Array }) storages: Storage[] = [];
  @property({ type: String }) userName!: string;

  _onRefresh(): void {
    window.location.reload();
  }

  _onRelocate(url: string): void {
    window.location.href = url;
  }

  protected render(): TemplateResult {
    const newStorageUrl = getUrl('newStorageUrl');

    return html`
      <div class="content_left">
        <div class="topbar-wrapper">
          <typo3-topbar>
            <span slot="left">${translate('myStorages')}</span>
          </typo3-topbar>
          <typo3-topbar>
            <div slot="left">
              ${newStorageUrl
                ? html`<typo3-button
                    @click="${() => this._onRelocate(newStorageUrl)}"
                  >
                     ${createSVGElement('addFolder', 'icon')}
                     ${translate('new')}
                  </typo3-button`
                : html``}
            </div>
          </typo3-topbar>
        </div>
        ${this.renderContent()}
      </div>
    `;
  }

  protected renderContent(): TemplateResult {
    if (0 === this.storages.length) {
      const switchUserUrl = getUrl('switchUserUrl');

      return html` <typo3-modal id="modal" open="true">
        <h2>${translate('storagesAccessDeniedTitle')}</h2>
        <p>${translate('storagesAccessDeniedMessage')}</p>
        <p><strong>${translate('userName')}</strong> ${this.userName}</p>
        <div
          slot="footer"
          style="display: flex;width: 100%;align-items: center;flex-direction: column; gap: 10px;"
        >
          ${switchUserUrl
            ? html`<typo3-button
                @click="${() => this._onRelocate(switchUserUrl)}"
                >${translate('storagesAccessDeniedSwitchUser')}</typo3-button
              >`
            : html``}
          <typo3-button color="success" @click="${this._onRefresh}">
            ${translate('storagesAccessDeniedRefresh')}
            ${createSVGElement('refresh', 'icon')}
          </typo3-button>
        </div>
      </typo3-modal>`;
    }

    return html` <div class="main-content">
      <typo3-alert color="primary" dismissible>
        ${createSVGElement('actions-info-circle-alt')}
        ${translate('selectStorageInfo')}
      </typo3-alert>
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
}
