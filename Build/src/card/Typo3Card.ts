import {
  CSSResultArray,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { cardStyles } from './typo3-card-styles';

export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  @property({ reflect: true }) variant: 'standard' | 'preview' = 'standard';

  static get styles(): CSSResultArray {
    return [cardStyles];
  }

  render(): TemplateResult {
    return html`
      <div class="image">
        <slot name="image"></slot>
        <slot name="badge"></slot>
      </div>
      <div class="body">
        <div class="title">${this.title}</div>
        <div class="subtitle">${this.subtitle}</div>
      </div>
    `;
  }
}
