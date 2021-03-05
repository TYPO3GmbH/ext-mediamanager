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

export const DELETE_FILES = '[FILE] DELETE FILES';
export const DELETE_FILES_CONFIRM = '[FILE] DELETE FILES CONFIRM';
export const DELETE_FILES_SUCCESS = '[FILE] DELETE FILES SUCCESS';
export const DELETE_FILES_FAILURE = '[FILE] DELETE FILES FAILURE';

export class DeleteFilesConfirm implements Action {
  readonly type = DELETE_FILES_CONFIRM;

  constructor(public identifiers: string[]) {}
}

export class DeleteFiles implements Action {
  readonly type = DELETE_FILES;

  constructor(public identifiers: string[]) {}
}

export class DeleteFilesSuccess implements SuccessAction {
  readonly type = DELETE_FILES_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}

export class DeleteFilesFailure implements Action {
  readonly type = DELETE_FILES_FAILURE;
}
