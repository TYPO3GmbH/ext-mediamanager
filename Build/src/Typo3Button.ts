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
      text-overflow: ellipsis;
      padding: 0.25rem;

      background-color: var(--typo3-button-background-color, #dedede);
      border-color: var(--typo3-border-color, #c4c4c4);
      color: var(--typo3-button-text-color, black);
      font-size: var(--typo3-button-font-size, 0.75rem);
      line-height: var(--typo3-button-line-height, 1.5);
      border-radius: var(--typo3-button-border-radius, 0.125rem);
      border-width: var(--typo3-button-border-width, 0.0625rem);
    }

    .btn_label {
      padding: 0 0.25rem;
    }

    ::slotted(*) {
      color: var(--typo3-button-text-color, black);
      fill: var(--typo3-button-text-color, black);
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
