import { combineEpics } from 'redux-observable';
import { closeModal } from './modal';

export const rootEpic = combineEpics(closeModal);
