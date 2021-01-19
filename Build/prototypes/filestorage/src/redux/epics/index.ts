import { combineEpics } from 'redux-observable';
import { fileActions } from './file-actions';
import { listActions } from './list';
import { treeActions } from './tree';
import { loadFlashMessages, reload } from './global-actions';
import { saveViewMode } from './view-mode';

export const rootEpic = combineEpics(
  ...fileActions,
  ...listActions,
  ...treeActions,
  reload,
  loadFlashMessages,
  saveViewMode
);
