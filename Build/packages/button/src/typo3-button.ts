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

import { customElement } from 'lit-element';

import styles from './typo3-button.pcss';
import themeStyles from '../../../theme/index.pcss';
import { Typo3BaseButton } from './typo3-base-button';

@customElement('typo3-button')
export class Typo3Button extends Typo3BaseButton {
  public static styles = [themeStyles, styles];
}
