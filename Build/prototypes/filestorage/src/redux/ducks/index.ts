import { combineReducers } from 'redux';
import { layoutReducer } from './layout';
import { viewModeReducer } from './view-mode';
import { selectionReducer } from './selection';
import { treeReducer } from './tree';
import { listReducer } from './list';

export const rootReducer = combineReducers({
  layout: layoutReducer,
  viewMode: viewModeReducer,
  selection: selectionReducer,
  tree: treeReducer,
  list: listReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
