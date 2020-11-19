import { combineEpics } from 'redux-observable';
import { renameFile } from './file-actions';
import { fetchListData } from './list';
import { fetchTreeData } from './tree';

export const rootEpic = combineEpics(renameFile, fetchListData, fetchTreeData);
