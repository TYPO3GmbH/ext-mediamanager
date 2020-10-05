import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { arrowIcon } from './arrow-icon.js';

export class Typo3DropDown extends LitElement {
  @property({ type: String }) label = '';

  @property({ type: String }) name = '';

  @property({ type: Boolean }) disabled = false;

  opened = false;

  static styles = css`
    .typo3-dropdown-root {
      display: flex;
      outline: none;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .typo3-dropdown-label {
      flex-grow: 1;
      align-items: center;
    }

    .typo3-dropdown-icon {
      color: var(--typo3-dropdown-icon-color, #dedede);
      padding-right: 0.5rem;

      outline: none;
      border-left: 1px solid transparent;
      min-width: 1rem;
      min-height: 1rem;
    }
  `;

  render(): TemplateResult {
    return html`
      <main>
        <div class="typo3-dropdown-root">
          <div class="typo3-dropdown-label">${this.label}</div>
          <div class="typo3-dropdown-icon">${arrowIcon}</div>
        </div>
      </main>
    `;
  }

  _toggleMenu(): void {
    if (this.disabled) {
      return;
    }
  }
}
