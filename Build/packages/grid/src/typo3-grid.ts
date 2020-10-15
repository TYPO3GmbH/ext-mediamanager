import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import styles from './typo3-grid.pcss';
import themeStyles from '../../../theme/index.pcss';

@customElement('typo3-grid')
export class Typo3Grid extends LitElement {
  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
