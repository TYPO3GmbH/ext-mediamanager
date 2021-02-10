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

import styles from './typo3-spinner.pcss';
import themeStyles from '../../../theme/index.pcss';

enum Color {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

/**
 * @cssprop --typo3-spinner-size
 * @cssprop --typo3-spinner-border-width
 * @cssprop --typo3-spinner-animation-duration
 * @cssprop --typo3-spinner-default-color
 * @cssprop --typo3-spinner-primary-color
 * @cssprop --typo3-spinner-success-color
 * @cssprop --typo3-spinner-info-color
 * @cssprop --typo3-spinner-warning-color
 * @cssprop --typo3-spinner-danger-color
 */
@customElement('typo3-spinner')
export class Typo3Spinner extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: String, reflect: true }) color: Color = Color.PRIMARY;
  @property({ type: String, reflect: true }) screenReaderText = 'Loading';

  protected render(): TemplateResult {
    return html`
      <div class="spinner-border" role="status">
        <span class="sr-only">${this.screenReaderText}</span>
      </div>
    `;
  }
}
