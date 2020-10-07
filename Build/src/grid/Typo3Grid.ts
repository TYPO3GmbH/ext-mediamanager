import { CSSResultArray, html, LitElement, TemplateResult } from 'lit-element';
import { gridStyles } from './typo3-grid-styles';

export class Typo3Grid extends LitElement {
  static get styles(): CSSResultArray {
    return [gridStyles];
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}