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
  query,
  TemplateResult,
} from 'lit-element';
import { Typo3Modal } from '../../../packages/modal/src/typo3-modal';
import { Typo3Node } from '../../../packages/filetree/src/lib/typo3-node';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-files-modal.pcss';
import { addSlotToRawHtml, resolveNodePath } from './lib/utils';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { styleMap } from 'lit-html/directives/style-map';
import { translate } from './services/translation.service';

@customElement('typo3-files-modal')
export class Typo3FilesModal extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: String }) mode: 'move' | 'copy' = 'move';
  @property({ type: Array }) nodes: Typo3Node[] = [];
  @property({ type: Array }) expandedNodeIds: string[] = [];
  @property({ type: Array }) selectedFiles: ListItem[] = [];

  @internalProperty() target: Typo3Node | null = null;

  @query('typo3-modal') modal!: Typo3Modal;

  render(): TemplateResult {
    const selectedFiles = this.selectedFiles.map(item =>
      this.formatFileItem(item)
    );

    let headline = translate('modal.move.title');
    let btnText = translate('modal.move.button');
    let message = translate('modal.move.message');

    if ('copy' === this.mode) {
      headline = translate('modal.copy.title');
      btnText = translate('modal.copy.button');
      message = translate('modal.move.message');
    }

    message = message.replace(/%\w*/gm, '' + this.selectedFiles.length);

    return html` <typo3-modal
      headline="${headline}"
      dismissible
      style="--typo3-modal-width: 60vw;--typo3-modal-content-padding:0;--typo3-modal-footer-padding:0; "
    >
      <typo3-splitpane>
        <div class="selected-files">
          <div
            class="selected-files-target"
            style=${styleMap({
              visibility: this.target ? 'visible' : 'hidden',
            })}
          >
            ${message} <br />
            <strong>${this._getFullPath(this.target)}</strong>
          </div>
          <typo3-list> ${selectedFiles} </typo3-list>
        </div>
        <typo3-filetree
          .nodes="${this.nodes}"
          .expandedNodeIds="${this.expandedNodeIds}"
          @typo3-node-select="${this._onSelectedNode}"
        ></typo3-filetree>
      </typo3-splitpane>
      <div slot="footer">
        <typo3-button
          color="primary"
          @click="${this._onSubmit}"
          ?disabled="${this.target == null || this.selectedFiles.length == 0}"
          >${btnText}</typo3-button
        >
      </div>
    </typo3-modal>`;
  }

  show(): void {
    this.target = null;
    this.modal.show();
  }

  _onSubmit(): void {
    const moveEvent = new CustomEvent('typo3-move-files', {
      detail: {
        mode: this.mode,
        files: this.selectedFiles,
        target: this.target,
      },
    });

    this.dispatchEvent(moveEvent);
    this.modal.close();
  }

  _onSelectedNode(event: CustomEvent<Typo3Node>): void {
    this.target = event.detail;
  }

  _getFullPath(target: Typo3Node | null): string {
    return resolveNodePath(this.nodes, target)
      .map(node => node.name)
      .join('/');
  }

  _onRemoveItem(item: ListItem): void {
    this.selectedFiles = this.selectedFiles.filter(
      listItem => listItem != item
    );
  }

  protected formatFileItem(item: ListItem): TemplateResult {
    const rawIcon = addSlotToRawHtml(item.icon, 'icon');
    let imageSlot = html`${unsafeHTML(rawIcon)}`;
    if (item.thumbnailUrl) {
      imageSlot = html`<img
        slot="icon"
        loading="lazy"
        src="${item.thumbnailUrl}"
        alt="${item.name}"
      />`;
    }

    const content = html`
      <div class="item-body">
        <div class="file-data">
          <div class="file-title">${item.name}</div>
          <div class="file-subtitle">${item.modified}</div>
        </div>
        <button
          class="btn-remove"
          style=${styleMap({
            visibility: this.selectedFiles.length > 1 ? 'visible' : 'hidden',
          })}
          @click="${() => this._onRemoveItem(item)}"
        >
          ×
        </button>
      </div>
    `;

    return html`<typo3-list-item>${imageSlot} ${content}</typo3-list-item>`;
  }
}
