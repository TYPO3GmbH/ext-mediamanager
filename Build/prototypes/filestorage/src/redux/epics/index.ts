import { combineEpics } from 'redux-observable';
import { renameFile } from './file-actions';
import { fetchListData } from './list';
import { fetchTreeData } from './tree';
import { loadFlashMessages, reload } from './global-actions';

export const rootEpic = combineEpics(
  renameFile,
  fetchListData,
  fetchTreeData,
  reload,
  loadFlashMessages
);
