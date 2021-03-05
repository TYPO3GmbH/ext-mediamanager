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

import {
  Actions,
  SET_SORT_ORDER_DIRECTION,
  SET_SORT_ORDER_FIELD,
  SET_VIEW_MODE,
} from '../../actions/view-mode';
import { ViewMode } from '../../../../types/view-mode';
import { OrderDirection } from '../../../../types/order-direction';

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
