import { combineEpics } from 'redux-observable';
import { closeModal } from './modal';
import { snackbarAction } from './snackbar';

export const rootEpic = combineEpics(closeModal, snackbarAction);
