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
import { Typo3Node } from '../../../../../../../packages/filetree/src/lib/typo3-node';
import { ConflictFileDto } from '../../../../../../shared/src/types/conflict-file-dto';
import { SuccessAction } from './success';

export const UPLOAD_FILES = '[FILE] UPLOAD FILES';
export const UPLOAD_FILES_SUCCESS = '[FILE] UPLOAD FILES SUCCESS';
export const UPLOAD_FILES_FAILURE = '[FILE] UPLOAD FILES FAILURE';
export const UPLOAD_FILES_CONFLICTS = '[FILE] UPLOAD FILES CONFLICTS';

export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;

  constructor(public dataTransfer: DataTransfer, public node: Typo3Node) {}
}

export class UploadFilesSuccess implements SuccessAction {
  readonly type = UPLOAD_FILES_SUCCESS;

  constructor(public message: string, public undoAction?: Action) {}
}

export class UploadFilesFailure implements Action {
  readonly type = UPLOAD_FILES_FAILURE;
}

export class UploadFilesConflicts implements Action {
  readonly type = UPLOAD_FILES_CONFLICTS;

  constructor(public files: ConflictFileDto[], public node: Typo3Node) {}
}
