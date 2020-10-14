import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import style from './typo3-badge.pcss';

export type Color =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

@customElement('typo3-badge')
export class Typo3Badge extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String, reflect: true }) color: Color = 'default';

  public static styles = style;

  render(): TemplateResult {
    return html` ${this.title} `;
  }
}
