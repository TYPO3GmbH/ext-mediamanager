import { combineEpics } from 'redux-observable';
import { fileActions } from './file-actions';
import { fetchListData } from './list';
import { fetchTreeData } from './tree';
import { loadFlashMessages, reload } from './global-actions';

export const rootEpic = combineEpics(
  ...fileActions,
  fetchListData,
  fetchTreeData,
  reload,
  loadFlashMessages
);