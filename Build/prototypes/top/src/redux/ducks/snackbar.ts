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

import { Action } from 'redux';
import {
  SnackbarButton,
  SnackbarData,
} from '../../../../shared/src/types/snackbar-data';

export const SHOW_SNACKBAR = '[SNACKBAR] SHOW';
export const SNACKBAR_ACTION = '[SNACKBAR] ACTION';

export class ShowSnackbar implements Action {
  readonly type = SHOW_SNACKBAR;

  constructor(public data: SnackbarData) {}
}

export class SnackbarAction implements Action {
  readonly type = SNACKBAR_ACTION;

  constructor(public action: string, public data?: SnackbarButton) {}
}

export type Actions = ShowSnackbar | SnackbarAction;
