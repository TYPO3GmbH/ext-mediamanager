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
import { memoize } from 'lodash-es';
import { RootState } from '../../reducers';
import { ViewMode } from '../../../../types/view-mode';

const viewModeSelector = (state: RootState) => state.viewMode;

export const isListMode = createSelector(
  viewModeSelector,
  layout => layout.mode === ViewMode.LIST
);

export const isTilesMode = createSelector(
  viewModeSelector,
  layout => layout.mode === ViewMode.TILES
);

export const getSortField = createSelector(
  viewModeSelector,
  layout => layout.order.field
);

export const getSortDirection = createSelector(
  viewModeSelector,
  layout => layout.order.direction
);

export const isSortField = createSelector(viewModeSelector, layout =>
  memoize((field: string) => layout.order.field === field)
);

export const isSortDirection = createSelector(viewModeSelector, layout =>
  memoize((direction: string) => layout.order.direction === direction)
);
