import { combineEpics } from 'redux-observable';
import {
  fileActionFailure,
  fileActionSuccess,
  addFolder,
  deleteFiles,
  renameFile,
  showFileInfo,
  uploadFiles,
} from './file-actions';
import { fetchListData } from './list';
import { fetchTreeData } from './tree';
import { loadFlashMessages, reload } from './global-actions';

export const rootEpic = combineEpics(
  fileActionSuccess,
  fileActionFailure,
  showFileInfo,
  deleteFiles,
  renameFile,
  addFolder,
  uploadFiles,
  fetchListData,
  fetchTreeData,
  reload,
  loadFlashMessages
);
