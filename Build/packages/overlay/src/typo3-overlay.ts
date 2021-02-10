/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

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
