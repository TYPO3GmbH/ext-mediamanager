import { html, LitElement, property, TemplateResult } from 'lit-element';
import { badgeStyles } from './typo3-badge-styles';

export class Typo3Badge extends LitElement {
  @property({ type: String }) title = '';

  static get styles() {
    return [badgeStyles];
  }

  render(): TemplateResult {
    return html` ${this.title} `;
  }
}
