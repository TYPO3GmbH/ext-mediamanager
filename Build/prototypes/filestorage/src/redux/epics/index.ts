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

import { combineEpics } from 'redux-observable';
import { fileActions } from './file-actions';
import { listActions } from './list';
import { treeActions } from './tree';
import { loadFlashMessages, reload } from './global-actions';
import { saveViewMode } from './view-mode';

export const rootEpic = combineEpics(
  ...fileActions,
  ...listActions,
  ...treeActions,
  reload,
  loadFlashMessages,
  saveViewMode
);
