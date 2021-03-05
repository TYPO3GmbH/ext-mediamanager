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
import { SuccessAction } from './success';

export const UNDO_FILES_ACTION = '[FILE] UNDO FILES ACTION';
export const UNDO_FILES_ACTION_SUCCESS = '[FILE] UNDO FILES ACTION SUCCESS';
export const UNDO_FILES_ACTION_FAILURE = '[FILE] UNDO FILES ACTION FAILURE';

export class UndoFilesAction implements Action {
  readonly type = UNDO_FILES_ACTION;

  constructor(public formData: { [key: string]: string }) {}
}

export class UndoFilesActionSuccess implements SuccessAction {
  readonly type = UNDO_FILES_ACTION_SUCCESS;

  constructor(public message: string) {}
}

export class UndoFilesActionFailure implements Action {
  readonly type = UNDO_FILES_ACTION_FAILURE;
}
