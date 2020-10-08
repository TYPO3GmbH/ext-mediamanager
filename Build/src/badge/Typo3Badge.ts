import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import style from './typo3-badge.scss';

export type Color =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export class Typo3Badge extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String, reflect: true }) color: Color = 'default';

  public static styles = style({ css });

  render(): TemplateResult {
    return html` ${this.title} `;
  }
}
