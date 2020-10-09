import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import style from './typo3-card.scss';

export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  @property({ reflect: true }) variant: 'standard' | 'preview' = 'standard';

  public static styles = style({ css });

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
