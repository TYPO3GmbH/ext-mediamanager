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
import { Node } from '../../../../../../../types/node';

export const ADD_FOLDER = '[FILE] ADD FOLDER';
export const ADD_FOLDER_SUCCESS = '[FILE] ADD FOLDER SUCCESS';
export const ADD_FOLDER_FAILURE = '[FILE] ADD FOLDER FAILURE';

export class AddFolder implements Action {
  readonly type = ADD_FOLDER;

  constructor(public node: Node, public parentNode: Node) {}
}

export class AddFolderSuccess implements SuccessAction {
  readonly type = ADD_FOLDER_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}

export class AddFolderFailure implements Action {
  readonly type = ADD_FOLDER_FAILURE;
}
