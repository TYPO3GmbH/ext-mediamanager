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

export const EDIT_FILE_STORAGE = '[FILE] EDIT FILE STORAGE';
export const EDIT_FILE_METADATA = '[FILE] EDIT FILE METADATA';

export class EditFileMetadata implements Action {
  readonly type = EDIT_FILE_METADATA;

  constructor(public metaDataUrl: string) {}
}

export class EditFileStorage implements Action {
  readonly type = EDIT_FILE_STORAGE;

  constructor(public identifier: string) {}
}
