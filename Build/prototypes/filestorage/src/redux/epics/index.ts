import { combineEpics } from 'redux-observable';
import { deleteFiles, renameFile, showFileInfo } from './file-actions';
import { fetchListData } from './list';
import { fetchTreeData } from './tree';
import { loadFlashMessages, reload } from './global-actions';

export const rootEpic = combineEpics(
  showFileInfo,
  deleteFiles,
  renameFile,
  fetchListData,
  fetchTreeData,
  reload,
  loadFlashMessages
);
