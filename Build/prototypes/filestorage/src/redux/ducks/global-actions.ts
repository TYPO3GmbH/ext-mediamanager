import { Action } from 'redux';
import { createSelector } from 'reselect';
import { RootState } from './index';
import { isExecutingFileAction } from './file-actions';

export const RELOAD = '[GLOBAL] Relaod';
export const LOAD_FLASH_MESSAGES = '[GLOBAL] Load Flash messages';

export class Reload implements Action {
  readonly type = RELOAD;
}

export class LoadFlashMessages implements Action {
  readonly type = LOAD_FLASH_MESSAGES;
}

export const isLoading = createSelector(
  (state: RootState) => state,
  state =>
    isExecutingFileAction(state.fileActions) ||
    state.list.loading ||
    state.tree.loading
);
