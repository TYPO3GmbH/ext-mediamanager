import { Typo3Button } from './Typo3Button';
import { CSSResultArray, html, property, TemplateResult } from 'lit-element';
import { arrowIcon } from '../shared/icons/arrow_icon';
import { buttonStyles } from './typo3-button-styles';
import { splitButtonStyles } from './typo3-split-button-styles';

export class Typo3SplitButton extends Typo3Button {
  @property({ type: Boolean, reflect: true }) public left = false;

  static get styles(): CSSResultArray {
    return [buttonStyles, splitButtonStyles];
  }

  render(): TemplateResult {
    const buttons: TemplateResult[] = [
      html`
        <button
          aria-haspopup="true"
          aria-label=${this.label}
          id="button"
          class="button"
          ?disabled=${this.disabled}
        >
          ${this.buttonContent}
        </button>
      `,
      html`
        <button
          class="button trigger"
          ?disabled=${this.disabled}
          aria-label="More"
        >
          ${arrowIcon}
        </button>
      `,
    ];
    if (this.left) {
      buttons.reverse();
    }
    return html` ${buttons} `;
  }
}
