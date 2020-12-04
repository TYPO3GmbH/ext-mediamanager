import {
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-card.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 * @fires typo3-card-title-rename - Event fired on title rename
 */
@customElement('typo3-card')
export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  @property({ type: String, reflect: true }) variant: 'standard' | 'preview' =
    'standard';

  @property({ type: Boolean, reflect: true }) selected = false;

  @property({ type: String, reflect: true }) value?: string;

  @property({ type: Boolean, reflect: true }) titleEditable = false;

  @query('.title') titleElement!: HTMLElement;

  public static styles = [themeStyles, styles];

  @internalProperty() inEditMode = false;

  render(): TemplateResult {
    return html`
      <div class="card" ?selected="${this.selected}">
        <div class="image">
          <slot name="image"></slot>
          <slot name="badge"></slot>
        </div>
        <div class="body">
          <div
            class="title"
            ?contentEditable="${this.inEditMode}"
            @dblclick="${this._onDoubleClick}"
            @blur="${() => this._onBlur()}"
            @keydown="${this._onKeyDown}"
          >
            ${this.title}
          </div>
          <div class="subtitle">${this.subtitle}</div>
        </div>
      </div>
    `;
  }

  _onDoubleClick(event: MouseEvent): void {
    if (this.titleEditable) {
      this.inEditMode = true;
      event.stopImmediatePropagation();
    }
  }

  _onBlur(skipChangeEvent = false): void {
    if (this.titleEditable && this.inEditMode) {
      this.inEditMode = false;
      const newTitle = this.titleElement.innerText.trim();
      this.titleElement.innerHTML = this.title;

      if (skipChangeEvent || newTitle === this.title) {
        return;
      }

      this.dispatchEvent(
        new CustomEvent('typo3-card-title-rename', {
          detail: newTitle,
        })
      );
    }
  }

  _onKeyDown(event: KeyboardEvent): void {
    if (['Enter', 'Tab', 'Escape'].indexOf(event.key) !== -1) {
      this._onBlur(event.key === 'Escape');
      event.stopPropagation();
    }
  }
}
