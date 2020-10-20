import { combineReducers } from 'redux';
import { layoutReducer } from './layout';
import { viewModeReducer } from './view-mode';
import { selectionReducer } from './selection';

export const rootReducer = combineReducers({
  layout: layoutReducer,
  viewMode: viewModeReducer,
  selection: selectionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
