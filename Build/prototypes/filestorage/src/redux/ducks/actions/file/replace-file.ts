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

export const REPLACE_FILE = '[FILE] REPLACE FILE';
export const REPLACE_FILE_SUCCESS = '[FILE] REPLACE FILES SUCCESS';
export const REPLACE_FILE_FAILURE = '[FILE] REPLACE FILES FAILURE';

export class ReplaceFile implements Action {
  readonly type = REPLACE_FILE;

  constructor(public formData: { [key: string]: string | Blob }) {}
}

export class ReplaceFileSuccess implements SuccessAction {
  readonly type = REPLACE_FILE_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}

export class ReplaceFileFailure implements Action {
  readonly type = REPLACE_FILE_FAILURE;
}

export const REPLACE_FILE_CONFIRM = '[FILE] REPLACE FILE CONFIRM';

export class ReplaceFileConfirm implements Action {
  readonly type = REPLACE_FILE_CONFIRM;

  constructor(public identifier: string) {}
}
