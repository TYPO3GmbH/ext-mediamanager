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
