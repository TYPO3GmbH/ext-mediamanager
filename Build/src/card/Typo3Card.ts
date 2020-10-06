import { html, LitElement, property, TemplateResult } from 'lit-element';
import { cardStyles } from './typo3-card-styles';

export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  static get styles() {
    return [cardStyles];
  }

  render(): TemplateResult {
    return html`
      <div class="image">
        <slot name="image"></slot>
      </div>
      <div class="body">
        <div class="title">${this.title}</div>
        <div class="subtitle">${this.subtitle}</div>
      </div>
    `;
  }
}
