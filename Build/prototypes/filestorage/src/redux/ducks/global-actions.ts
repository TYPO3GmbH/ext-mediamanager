import { Action } from 'redux';
import { createSelector } from 'reselect';
import { RootState } from './index';
import { isExecutingFileAction } from './file-actions';
import { SnackbarVariants } from '../../../../../packages/snackbar/src/lib/snackbar-variants';

export const RELOAD = '[GLOBAL] RELOAD';
export const LOAD_FLASH_MESSAGES = '[GLOBAL] LOAD FLASH MESSAGES';

export class Reload implements Action {
  readonly type = RELOAD;
}

export class LoadFlashMessages implements Action {
  readonly type = LOAD_FLASH_MESSAGES;
  constructor(
    public variant: SnackbarVariants,
    public message?: string,
    public undoAction?: Action
  ) {}
}

export const isLoading = createSelector(
  (state: RootState) => state,
  state =>
    isExecutingFileAction(state.fileActions) ||
    state.list.loading ||
    state.tree.loading
);
