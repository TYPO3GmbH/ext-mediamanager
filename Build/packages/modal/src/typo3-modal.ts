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
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-modal.pcss';
import themeStyles from '../../../theme/index.pcss';
import { ModalVariant } from './lib/modal-variant';

/**
 * @fires typo3-modal-open - Dispatched when modal is opened
 * @fires typo3-modal-close - Dispatched when modal is closed
 *
 * @slot - Default modal content
 * @slot footer - Modal footer
 *
 * @cssprop --typo3-modal-background-color
 * @cssprop --typo3-modal-width
 * @cssprop --typo3-modal-border-width
 * @cssprop --typo3-modal-border-color
 * @cssprop --typo3-modal-border-radius
 * @cssprop --typo3-modal-font-size
 * @cssprop --typo3-modal-header-padding
 * @cssprop --typo3-modal-content-padding
 * @cssprop --typo3-modal-footer-padding
 * @cssprop --typo3-modal-overlay-opacity
 *
 */
@customElement('typo3-modal')
export class Typo3Modal extends LitElement {
  /**
   * @type String
   */
  @property({ type: String, reflect: true }) variant: ModalVariant =
    ModalVariant.info;

  /**
   * @type Boolean
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * @type String
   */
  @property({ type: String, reflect: true }) headline = '';

  /**
   * @type Boolean
   */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  @query('#modal') modal!: HTMLElement;

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html` <div
      class="wrapper ${this.open ? 'open' : ''}"
      aria-hidden="${!this.open}"
    >
      <typo3-overlay fixed @click="${this.close}"></typo3-overlay>
      <div id="modal" class="modal" tabindex="-1">
        ${this.headerContent}
        <div id="content" class="content">${this.messageContent}</div>
        <div id="footer" class="footer">${this.footerContent}</div>
      </div>
    </div>`;
  }

  private get headerContent(): TemplateResult {
    if ('' === this.headline && !this.dismissible) {
      return html``;
    }

    return html`
      <div class="header">
        ${this.headline
          ? html`
              <h4 class="modal-title" slot="headline">${this.headline}</h4>
            `
          : html``}
        ${this.dismissible
          ? html`
              <button
                class="btn-close"
                aria-label="Close"
                @click="${this.close}"
              >
                <span class="icon-actions-close" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path
                      d="M11.9 5.5L9.4 8l2.5 2.5c.2.2.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0L8 9.4l-2.5 2.5c-.2.2-.5.2-.7 0l-.7-.7c-.2-.2-.2-.5 0-.7L6.6 8 4.1 5.5c-.2-.2-.2-.5 0-.7l.7-.7c.2-.2.5-.2.7 0L8 6.6l2.5-2.5c.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7z"
                    ></path>
                  </svg>
                </span>
              </button>
            `
          : html``}
      </div>
    `;
  }

  get messageContent(): TemplateResult {
    return html`<slot></slot>`;
  }

  get footerContent(): TemplateResult {
    return html`<slot name="footer"></slot>`;
  }

  show(): void {
    const closeEvent = new CustomEvent('typo3-modal-open');
    this.dispatchEvent(closeEvent);
    this.open = true;
    setTimeout(() => this.modal.focus(), 2);
    window.addEventListener('keydown', event => this._onKeyDown(event));
  }

  close(): void {
    window.removeEventListener('keydown', event => this._onKeyDown(event));
    this.open = false;
    const closeEvent = new CustomEvent('typo3-modal-close');
    this.dispatchEvent(closeEvent);
  }

  _onKeyDown(event: KeyboardEvent): void {
    if (this.dismissible && 'Escape' === event.key) {
      this.close();
    }
  }
}
