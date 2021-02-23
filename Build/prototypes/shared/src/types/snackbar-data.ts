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

import { Color } from '../../../../packages/button/src/typo3-base-button';
import { SeverityEnum } from './Severity';

export interface SnackbarButton {
  label: string;
  color: Color;
  action: string;
  data?: unknown;
}

export interface SnackbarData {
  message?: string;
  title?: string;
  severity: SeverityEnum;
  buttons?: SnackbarButton[];
  duration: number;
  dismissible: boolean;
}
