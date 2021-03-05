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
  SET_SIDEBAR_WIDTH,
  TOGGLE_SIDEBAR,
} from '../../actions/layout';

export type LayoutState = Readonly<{
  sidebarWidth: number;
  sidebarVisible: boolean;
}>;

const initialState: LayoutState = {
  sidebarWidth: 25,
  sidebarVisible: true,
};

export const layoutReducer = (
  state = initialState,
  action: Actions
): LayoutState => {
  switch (action.type) {
    case SET_SIDEBAR_WIDTH:
      return { ...state, sidebarWidth: action.sidebarWidth };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarVisible: !state.sidebarVisible };
    default:
      return state;
  }
};
