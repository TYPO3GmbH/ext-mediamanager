import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import style from './typo3-grid.pcss';

@customElement('typo3-grid')
export class Typo3Grid extends LitElement {
  public static styles = style;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
