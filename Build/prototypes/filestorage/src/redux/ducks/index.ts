import { combineReducers } from 'redux';
import { layoutReducer } from './layout';
import { viewModeReducer } from './view-mode';
import { treeReducer } from './tree';
import { listReducer } from './list';
import { fileActionsReducer } from './file-actions';

export const rootReducer = combineReducers({
  layout: layoutReducer,
  viewMode: viewModeReducer,
  tree: treeReducer,
  list: listReducer,
  fileActions: fileActionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
