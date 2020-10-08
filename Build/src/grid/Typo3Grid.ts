import { css, html, LitElement, TemplateResult } from 'lit-element';

import style from './typo3-grid.scss';

export class Typo3Grid extends LitElement {
  public static styles = style({ css });

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
