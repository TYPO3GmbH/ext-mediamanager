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

export const DRAG_FILES_START = '[FILE] DRAG FILES START';
export const DRAG_FILES_CHANGE_MODE = '[FILE] DRAG FILES CHANGE MODE';
export const DRAG_FILES_END = '[FILE] DRAG FILES END';

export class DragFilesEnd implements Action {
  readonly type = DRAG_FILES_END;
}

export class DragFilesChangeMode implements Action {
  readonly type = DRAG_FILES_CHANGE_MODE;

  constructor(public mode: 'move' | 'copy') {}
}

export class DragFilesStart implements Action {
  readonly type = DRAG_FILES_START;
}
