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
import {
  SnackbarButton,
  SnackbarData,
} from '../../../../shared/src/types/snackbar-data';
import { createSelector } from 'reselect';
import { RootState } from './index';

export const SHOW_SNACKBAR = '[SNACKBAR] SHOW';
export const CLOSE_SNACKBAR = '[SNACKBAR] CLOSE';
export const SNACKBAR_ACTION = '[SNACKBAR] ACTION';

export type SnackbarState = Readonly<{
  open: boolean;
  messageId?: number;
  data?: SnackbarData;
}>;

const initialState: SnackbarState = {
  open: false,
};

export const snackbarReducer = (
  state = initialState,
  action: Actions
): SnackbarState => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        data: action.data,
        messageId: Math.floor(Date.now() / 1000),
        open: true,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
        data: undefined,
        messageId: undefined,
      };
    default:
      return state;
  }
};

export class ShowSnackbar implements Action {
  readonly type = SHOW_SNACKBAR;
  constructor(public data: SnackbarData) {}
}

export class CloseSnackbar implements Action {
  readonly action = 'close';
  readonly data = {};
  readonly type = CLOSE_SNACKBAR;
}

export class SnackbarAction implements Action {
  readonly type = SNACKBAR_ACTION;
  constructor(public action: string, public data?: SnackbarButton) {}
}

export type Actions = ShowSnackbar | CloseSnackbar | SnackbarAction;

const snackbarSelector = (state: RootState) => state.snackbar;

export const getSnackbarData = createSelector(
  snackbarSelector,
  snackbar => snackbar.data ?? null
);

export const getActionButtons = createSelector(
  getSnackbarData,
  snackbarData => snackbarData?.buttons ?? []
);
