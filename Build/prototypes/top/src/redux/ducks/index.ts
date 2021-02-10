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
import { modalReducer } from './modal';
import { snackbarReducer } from './snackbar';

export const rootReducer = combineReducers({
  modal: modalReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
