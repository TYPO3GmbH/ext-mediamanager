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

import styles from './typo3-badge.pcss';
import themeStyles from '../../../theme/index.pcss';

export type Color =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export type Size = 'small' | 'medium';

@customElement('typo3-badge')
export class Typo3Badge extends LitElement {
  @property({ type: String, reflect: true }) color: Color = 'default';

  @property({ type: String, reflect: true }) size: Size = 'medium';

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
