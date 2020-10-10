import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import style from './typo3-button.scss';

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export class Typo3Button extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: String }) label = '';

  @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
  iconRight = false;

  @property({ type: String, reflect: true }) color: Color = 'default';

  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      <button
        id="button"
        class="button"
        ?disabled="${this.disabled}"
        aria-label=${this.label}
      >
        ${this.buttonContent}
      </button>
    `;
  }

  protected get buttonContent(): TemplateResult[] {
    const icon = html`<slot name="icon"></slot>`;
    const label = html`<div id="label"><slot></slot></div>`;

    const content = [];

    if (this.hasText) {
      content.push(label);
    }

    if (this.hasIcon) {
      this.iconRight ? content.push(icon) : content.unshift(icon);
    }

    return content;
  }

  private get hasText(): boolean {
    return this.textContent ? this.textContent.trim() !== '' : false;
  }

  private get hasIcon(): boolean {
    return !!this.querySelector('[slot="icon"]');
  }
}
