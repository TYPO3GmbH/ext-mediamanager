import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import styles from './typo3-topbar.pcss';
import themeStyles from '../../../theme/index.pcss';

@customElement('typo3-topbar')
export class Typo3Topbar extends LitElement {
  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html`
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    `;
  }
}
