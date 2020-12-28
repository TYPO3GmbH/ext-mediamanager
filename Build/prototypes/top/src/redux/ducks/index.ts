import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { snackbarReducer } from './snackbar';

export const rootReducer = combineReducers({
  modal: modalReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
