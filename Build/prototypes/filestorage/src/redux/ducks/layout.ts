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

export const SET_SIDEBAR_WIDTH = '[LAYOUT] SET SIDEBAR WIDTH';
export const TOGGLE_SIDEBAR = '[LAYOUT] TOGGLE SIDEBAR';

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

export class SetSidebarWidth implements Action {
  readonly type = SET_SIDEBAR_WIDTH;

  constructor(public sidebarWidth: number) {}
}

export class ToggleSidebar implements Action {
  readonly type = TOGGLE_SIDEBAR;
}

export type Actions = SetSidebarWidth | ToggleSidebar;

const layoutSelector = (state: RootState) => state.layout;

export const getSidebarWidth = createSelector(
  layoutSelector,
  layout => layout.sidebarWidth
);

export const isSidebarVisible = createSelector(
  layoutSelector,
  layout => layout.sidebarVisible
);
