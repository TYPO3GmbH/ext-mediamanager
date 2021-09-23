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
import { Node } from '../../../../../../../types/node';
import { SuccessAction } from './success';

export const MOVE_FILES = '[FILE] MOVE FILES';
export const MOVE_FILES_SUCCESS = '[FILE] MOVE FILES SUCCESS';
export const MOVE_FILES_FAILURE = '[FILE] MOVE FILES FAILURE';

export class MoveFiles implements Action {
  readonly type = MOVE_FILES;

  constructor(public identifiers: string[], public target: Node | ListItem) {}
}

export class MoveFilesFailure implements Action {
  readonly type = MOVE_FILES_FAILURE;
}

export class MoveFilesSuccess implements SuccessAction {
  readonly type = MOVE_FILES_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}
