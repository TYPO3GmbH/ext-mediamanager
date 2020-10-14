import {
  css,
  customElement,
  html,
  LitElement,
  TemplateResult,
} from 'lit-element';

import style from './typo3-grid.scss';

@customElement('typo3-grid')
export class Typo3Grid extends LitElement {
  public static styles = style({ css });

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
