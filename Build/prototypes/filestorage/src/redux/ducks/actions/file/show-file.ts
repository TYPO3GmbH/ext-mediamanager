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

export const SHOW_FILE_INFO = '[FILE] SHOW FILE INFO';
export const SHOW_FILE = '[FILE] SHOW FILE';

export class ShowFile implements Action {
  readonly type = SHOW_FILE;

  constructor(public fileUrl: string) {}
}

export class ShowFileInfo implements Action {
  readonly type = SHOW_FILE_INFO;

  constructor(public identifier: string, public sysType: '_FILE' | '_FOLDER') {}
}
