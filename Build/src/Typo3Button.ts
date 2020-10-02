import { LitElement, html, css, property, TemplateResult } from 'lit-element';

export class Typo3Button extends LitElement {
  @property({ type: String }) type = 'button';

  @property({ type: Boolean }) disabled = false;

  @property({ type: String }) label = '';

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    button {
      box-sizing: border-box;
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      outline: none;
      padding: 4px 4px;
      font-size: 11px;
      line-height: 1.5;
      border-radius: 2px;
      border-width: 0.0625rem;
      text-overflow: ellipsis;
    }
  `;

  render(): TemplateResult {
    return html`
      <main>
        <button
          type="${this.type}"
          @click="${this._handleClick}"
          ?disabled="${this.disabled}"
          title="${this.label}"
        >
          <slot name="icon_left"></slot>
          <span class="btn_label">${this.label}</span>
          <slot name="icon_right"></slot>
        </button>
      </main>
    `;
  }

  _handleClick(): void {
    if (true === this.disabled) {
      return;
    }
    this.dispatchEvent(new CustomEvent('btn-click', { detail: true }));
  }
}
