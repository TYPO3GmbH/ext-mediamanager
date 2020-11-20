import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import styles from './typo3-overlay.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 * @cssprop --typo3-modal-overlay-opacity
 * @cssprop --typo3-modal-overlay-color
 */
@customElement('typo3-overlay')
export class Typo3Overlay extends LitElement {
  public static styles = [themeStyles, styles];

  protected render(): TemplateResult {
    return html``;
  }
}
