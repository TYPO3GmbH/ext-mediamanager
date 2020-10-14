import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import style from './typo3-alert.scss';

export type Color = 'default' | 'success' | 'info' | 'warning' | 'danger';

/**
 * @fires typo3-alert-close - Dispatched when dismissible alert is closed
 * @slot - Default content placed in message div of this element
 *
 * @cssprop --typo3-alert-padding-y
 * @cssprop --typo3-alert-padding-x
 * @cssprop --typo3-alert-margin-bottom
 *
 * @cssprop --typo3-alert-success-color
 * @cssprop --typo3-alert-success-background-color
 * @cssprop --typo3-alert-success-border-color
 *
 * @cssprop --typo3-alert-info-color
 * @cssprop --typo3-alert-info-background-color
 * @cssprop --typo3-alert-info-border-color
 *
 * @cssprop --typo3-alert-warning-color
 * @cssprop --typo3-alert-warning-background-color
 * @cssprop --typo3-alert-warning-border-color
 *
 * @cssprop --typo3-alert-danger-color
 * @cssprop --typo3-alert-danger-background-color
 * @cssprop --typo3-alert-danger-border-color
 *
 * @cssprop --typo3-alert-close-btn-font-size
 * @cssprop --typo3-alert-close-btn-font-weight
 * @cssprop --typo3-alert-close-btn-line-height
 * @cssprop --typo3-alert-close-btn-color
 * @cssprop --typo3-alert-close-btn-color-hover
 */
@customElement('typo3-alert')
export class Typo3Alert extends LitElement {
  /**
   * @attr
   * @type String
   */
  @property({ type: String, reflect: true }) color: Color = 'default';

  /**
   * @attr
   * @type Boolean
   */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  @internalProperty() isHidden = false;

  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      ${!this.isHidden
        ? html` <div id="alert">
            <div id="message">
              <slot></slot>
            </div>
            ${this.dismissible
              ? html`<button id="btn-close" @click="${this.close}">×</button>`
              : ''}
          </div>`
        : ''}
    `;
  }

  close(): void {
    if (this.dismissible) {
      this.isHidden = true;
      this.dispatchEvent(new CustomEvent('typo3-alert-close'));
    }
  }
}
