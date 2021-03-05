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

import { createSelector } from 'reselect';
import { RootState } from '../../reducers';
import { isExecutingFileAction } from '../file';

export const isLoading = createSelector(
  (state: RootState) => state,
  state =>
    isExecutingFileAction(state.fileActions) ||
    state.list.loading ||
    state.tree.loading
);
