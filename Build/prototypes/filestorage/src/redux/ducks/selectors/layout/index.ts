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

import { RootState } from '../../reducers';
import { createSelector } from 'reselect';

const layoutSelector = (state: RootState) => state.layout;

export const getSidebarWidth = createSelector(
  layoutSelector,
  layout => layout.sidebarWidth
);

export const isSidebarVisible = createSelector(
  layoutSelector,
  layout => layout.sidebarVisible
);
