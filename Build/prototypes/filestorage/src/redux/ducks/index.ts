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

import { combineReducers } from 'redux';
import { layoutReducer } from './layout';
import { viewModeReducer } from './view-mode';
import { treeReducer } from './tree';
import { listReducer } from './list';
import { fileActionsReducer } from './file-actions';

export const rootReducer = combineReducers({
  layout: layoutReducer,
  viewMode: viewModeReducer,
  tree: treeReducer,
  list: listReducer,
  fileActions: fileActionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
