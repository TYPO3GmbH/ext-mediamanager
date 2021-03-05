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
import { SuccessAction } from './success';

export const CLIPBOARD_COPY_FILE = '[FILE][CLIPBOARD] COPY FILE';
export const CLIPBOARD_CUT_FILE = '[FILE][CLIPBOARD] CUT FILE';
export const CLIPBOARD_PASTE = '[FILE][CLIPBOARD] PASTE';
export const CLIPBOARD_PASTE_SUCCESS = '[FILE][CLIPBOARD] PASTE SUCCESS';
export const CLIPBOARD_PASTE_FAILURE = '[FILE][CLIPBOARD] PASTE FAILURE';

abstract class ClipboardAction {
  constructor(public contextItems: (Typo3Node | ListItem)[]) {}
}

export class ClipboardCopyFile extends ClipboardAction implements Action {
  readonly type = CLIPBOARD_COPY_FILE;
}

export class ClipboardCutFile extends ClipboardAction implements Action {
  readonly type = CLIPBOARD_CUT_FILE;
}

export class ClipboardPaste implements Action {
  readonly type = CLIPBOARD_PASTE;

  constructor(public targetIdentifier: string) {}
}

export class ClipboardPasteFailure implements Action {
  readonly type = CLIPBOARD_PASTE_FAILURE;
}

export class ClipboardPasteSuccess implements SuccessAction {
  readonly type = CLIPBOARD_PASTE_SUCCESS;

  constructor(public message: string) {}
}
