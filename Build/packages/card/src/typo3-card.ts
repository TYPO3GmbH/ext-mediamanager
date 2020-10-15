import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-card.pcss';
import themeStyles from '../../../theme/index.pcss';

@customElement('typo3-card')
export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  @property({ reflect: true }) variant: 'standard' | 'preview' = 'standard';

  public static styles = [themeStyles, styles];

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
