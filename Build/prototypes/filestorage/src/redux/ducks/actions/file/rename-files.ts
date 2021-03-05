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

export const RENAME_FILE = '[FILE] RENAME';
export const RENAME_FILE_SUCCESS = '[FILE] RENAME SUCCESS';
export const RENAME_FILE_FAILURE = '[FILE] RENAME FAILURE';

export class RenameFile implements Action {
  readonly type = RENAME_FILE;

  constructor(public identifier: string, public name: string) {}
}

export class RenameFileSuccess implements SuccessAction {
  readonly type = RENAME_FILE_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}

export class RenameFileFailure implements Action {
  readonly type = RENAME_FILE_FAILURE;
}
