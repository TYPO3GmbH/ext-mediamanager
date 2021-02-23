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
import { createSelector } from 'reselect';
import { RootState } from './index';
import { isExecutingFileAction } from './file-actions';
import { SeverityEnum } from '../../../../shared/src/types/Severity';

export const RELOAD = '[GLOBAL] RELOAD';
export const LOAD_FLASH_MESSAGES = '[GLOBAL] LOAD FLASH MESSAGES';

export class Reload implements Action {
  readonly type = RELOAD;
}

export class LoadFlashMessages implements Action {
  readonly type = LOAD_FLASH_MESSAGES;

  constructor(
    public severity: SeverityEnum,
    public message?: string,
    public undoAction?: Action
  ) {}
}

export const isLoading = createSelector(
  (state: RootState) => state,
  state =>
    isExecutingFileAction(state.fileActions) ||
    state.list.loading ||
    state.tree.loading
);
