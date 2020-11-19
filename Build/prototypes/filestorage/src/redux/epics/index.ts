import { combineEpics } from 'redux-observable';
import {
  addFolder,
  deleteFiles,
  renameFile,
  showFileInfo,
} from './file-actions';
import { fetchListData } from './list';
import { fetchTreeData } from './tree';
import { loadFlashMessages, reload } from './global-actions';

export const rootEpic = combineEpics(
  showFileInfo,
  deleteFiles,
  renameFile,
  addFolder,
  fetchListData,
  fetchTreeData,
  reload,
  loadFlashMessages
);
