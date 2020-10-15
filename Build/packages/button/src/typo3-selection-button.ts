import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-selection-button.pcss';
import themeStyles from '../../../theme/index.pcss';
import defaultStyles from './typo3-button.pcss';
import { Typo3Button } from './typo3-button';

@customElement('typo3-selection-button')
export class Typo3SelectionButton extends LitElement {
  @property({ type: Number, reflect: true }) count = 0;

  @property({ type: String, reflect: true }) suffix = 'Selected';

  @property({ type: String, reflect: true }) color = 'primary';

  @query('typo3-button') button?: Typo3Button;

  public static styles = [themeStyles, defaultStyles, styles];

  render(): TemplateResult {
    if (0 === this.count) {
      return html``;
    }
    return html`
      <div class="button">${this.count} ${this.suffix}</div>
      <typo3-button
        color="${this.color}"
        icon-right
        @click="${this.clearSelection}"
        ><svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
          /></svg
      ></typo3-button>
    `;
  }

  clearSelection(): void {
    this.count = 0;
    this.dispatchEvent(new CustomEvent('typo3-selection-clear'));
  }
}
