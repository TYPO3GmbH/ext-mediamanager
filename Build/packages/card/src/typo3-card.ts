import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-card.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 * @fires typo3-card-selected - Dispatched when card is selected
 * @fires typo3-card-unselected - Dispatched when card is unselected
 */
@customElement('typo3-card')
export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  @property({ type: String, reflect: true }) variant: 'standard' | 'preview' =
    'standard';

  @property({ type: Boolean, reflect: true }) selectable = false;

  @property({ type: Boolean, reflect: true }) selected = false;

  @property({ type: String, reflect: true }) value?: string;

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html`
      <div
        class="card"
        @click="${this.toggleSelection}"
        ?selected="${this.selected}"
      >
        <div class="image">
          <slot name="image"></slot>
          <slot name="badge"></slot>
        </div>
        <div class="body">
          <div class="title">${this.title}</div>
          <div class="subtitle">${this.subtitle}</div>
        </div>
      </div>
    `;
  }

  toggleSelection(): void {
    if (this.selectable) {
      this.selected = !this.selected;
      this.dispatchEvent(
        new CustomEvent(
          this.selected ? 'typo3-card-selected' : 'typo3-card-unselected'
        )
      );
    }
  }
}
