import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import style from './typo3-modal.pcss';

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
 * @cssprop --typo3-modal-padding
 * @cssprop --typo3-modal-overlay-opacity
 *
 * @cssprop --typo3-modal-close-btn-font-size
 * @cssprop --typo3-modal-close-btn-font-weight
 * @cssprop --typo3-modal-close-btn-line-height
 * @cssprop --typo3-modal-close-btn-color
 * @cssprop --typo3-modal-close-btn-opacity
 * @cssprop --typo3-modal-close-btn-color-hover
 */
@customElement('typo3-modal')
export class Typo3Modal extends LitElement {
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

  public static styles = style;

  render(): TemplateResult {
    return html` <div
      class="wrapper ${this.open ? 'open' : ''}"
      aria-hidden="${!this.open}"
    >
      <div class="overlay" @click="${this.close}"></div>
      <div id="modal" class="modal">
        ${this.headerContent}
        <div id="content" class="content">
          <slot></slot>
        </div>
        <div id="footer" class="footer">
          <slot name="footer"></slot>
        </div>
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
          ? html` <h5 slot="headline">${this.headline}</h5> `
          : html``}
        ${this.dismissible
          ? html`
              <button id="btn-close" aria-label="Close" @click=${this.close}>
                ✖️
              </button>
            `
          : html``}
      </div>
    `;
  }

  show(): void {
    const closeEvent = new CustomEvent('typo3-modal-open');
    this.dispatchEvent(closeEvent);
    this.open = true;
  }

  close(): void {
    this.open = false;
    const closeEvent = new CustomEvent('typo3-modal-close');
    this.dispatchEvent(closeEvent);
  }
}
