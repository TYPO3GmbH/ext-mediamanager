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
import { memoize } from 'lodash-es';

const listSelector = (state: RootState) => state.list;
export const getItems = createSelector(listSelector, list => list.items ?? []);
export const isItemSelected = createSelector(listSelector, list =>
  memoize((itemId: string) => list.selectedItemIds.includes(itemId))
);
export const isEmptySelection = createSelector(
  listSelector,
  list => list.selectedItemIds.length === 0
);
export const getSelectedItems = createSelector(
  listSelector,
  getItems,
  (list, items) =>
    items.filter(item => list.selectedItemIds.includes(item.identifier))
);
export const getListItemByIdentifier = createSelector(getItems, items =>
  memoize(
    (identifier: string) =>
      items.find(item => identifier === item.identifier) ?? null
  )
);
export const isInSearchMode = createSelector(
  listSelector,
  list => null !== list.searchTerm
);
export const getSearchTermString = createSelector(
  listSelector,
  list => list.searchTerm ?? ''
);
