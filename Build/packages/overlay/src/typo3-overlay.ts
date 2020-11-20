import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-overlay.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 * @cssprop --typo3-modal-overlay-opacity
 * @cssprop --typo3-modal-overlay-color
 */
@customElement('typo3-overlay')
export class Typo3Overlay extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: Boolean, reflect: true }) fixed = false;

  protected render(): TemplateResult {
    return html``;
  }
}
