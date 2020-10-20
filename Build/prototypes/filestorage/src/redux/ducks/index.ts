import { combineReducers } from 'redux';
import { layoutReducer } from './layout';
import { viewModeReducer } from './view-mode';

export const rootReducer = combineReducers({
  layout: layoutReducer,
  viewMode: viewModeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
