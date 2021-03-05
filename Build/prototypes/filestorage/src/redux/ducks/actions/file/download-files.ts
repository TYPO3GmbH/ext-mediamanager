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

export const DOWNLOAD_FILES = '[FILE] DOWNLOAD FILES';
export const DOWNLOAD_FILES_SUCCESS = '[FILE] DOWNLOAD FILES SUCCESS';
export const DOWNLOAD_FILES_FAILURE = '[FILE] DOWNLOAD FILES FAILURE';

export class DownloadFiles implements Action {
  readonly type = DOWNLOAD_FILES;

  constructor(public identifiers: string[]) {}
}

export class DownloadFilesSuccess implements Action {
  readonly type = DOWNLOAD_FILES_SUCCESS;
}

export class DownloadFilesFailure implements Action {
  readonly type = DOWNLOAD_FILES_FAILURE;
}
