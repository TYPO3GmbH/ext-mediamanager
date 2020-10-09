import {
  css,
  html,
  internalProperty,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import style from '../alert/typo3-alert.scss';

export type Color = 'default' | 'success' | 'info' | 'warning' | 'danger';

export class Typo3Alert extends LitElement {
  @property({ type: String, reflect: true }) color: Color = 'default';

  @property({ type: Boolean, reflect: true }) dismissable = false;

  @internalProperty() isHidden = false;

  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      ${!this.isHidden
        ? html` <div id="alert">
            <div id="message">
              <slot></slot>
            </div>
            ${this.dismissable
              ? html`<button id="btn-close" @click="${this.close}">×</button>`
              : ''}
          </div>`
        : ''}
    `;
  }

  close(): void {
    if (this.dismissable) {
      this.isHidden = true;
      this.dispatchEvent(new CustomEvent('typo3-alert-closed'));
    }
  }
}
