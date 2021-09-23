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

export const COPY_FILES = '[FILE] COPY FILES';
export const COPY_FILES_SUCCESS = '[FILE] COPY FILES SUCCESS';
export const COPY_FILES_FAILURE = '[FILE] COPY FILES FAILURE';

export class CopyFiles implements Action {
  readonly type = COPY_FILES;

  constructor(public identifiers: string[], public target: Node | ListItem) {}
}

export class CopyFilesFailure implements Action {
  readonly type = COPY_FILES_FAILURE;
}

export class CopyFilesSuccess implements Action {
  readonly type = COPY_FILES_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}
