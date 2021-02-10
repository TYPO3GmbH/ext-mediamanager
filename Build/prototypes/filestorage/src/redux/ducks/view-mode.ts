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
import { RootState } from './index';
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

export enum ViewMode {
  LIST = 'list',
  TILES = 'tiles',
}

export enum OrderDirection {
  'ASC' = 'asc',
  'DESC' = 'desc',
}

export const SET_VIEW_MODE = '[VIEW_MODE] SET MODE';
export const SET_SORT_ORDER_FIELD = '[VIEW_MODE] SET SORT ORDER FIELD';
export const SET_SORT_ORDER_DIRECTION = '[VIEW_MODE] SET SORT ORDER DIRECTION';

export type ViewModeState = Readonly<{
  mode: ViewMode;
  order: {
    field: string;
    direction: OrderDirection;
  };
}>;

const initialState: ViewModeState = {
  mode:
    (localStorage.getItem('t3-file-list-view-mode') as ViewMode) ??
    ViewMode.LIST,
  order: {
    field: 'name',
    direction: OrderDirection.ASC,
  },
};

export const viewModeReducer = (
  state = initialState,
  action: Actions
): ViewModeState => {
  switch (action.type) {
    case SET_VIEW_MODE:
      return { ...state, mode: action.viewmode };
    case SET_SORT_ORDER_FIELD:
      return {
        ...state,
        order: { ...state.order, field: action.field },
      };
    case SET_SORT_ORDER_DIRECTION:
      return {
        ...state,
        order: {
          ...state.order,
          direction: action.direction as OrderDirection,
        },
      };
    default:
      return state;
  }
};

export class SetViewMode implements Action {
  readonly type = SET_VIEW_MODE;

  constructor(public viewmode: ViewMode) {}
}

export class SetSortOrderField implements Action {
  readonly type = SET_SORT_ORDER_FIELD;

  constructor(public field: string) {}
}

export class SetSortOrderDirection implements Action {
  readonly type = SET_SORT_ORDER_DIRECTION;

  constructor(public direction: string) {}
}

export type Actions = SetViewMode | SetSortOrderField | SetSortOrderDirection;

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
