import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
} from 'redux';
import { rootReducer } from './ducks';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { FlashMessagesService } from '../services/flash-messages.service';
import { UndoActionResolverService } from '../services/undo-action-resolver.service';
import { ModalService } from '../services/modal.service';
import { ApiService } from '../services/api.service';

const allowCustomActionObjectsMiddleWare: Middleware = () => next => (
  action: Action
) => {
  next({ ...action });
};

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    flashMessagesService: new FlashMessagesService(new ApiService()),
    undoActionResolverService: new UndoActionResolverService(),
    modalService: new ModalService(),
    apiService: new ApiService(),
  },
});

const enhancer = [];
if (
  process.env.NODE_ENV === 'development' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enhancer.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(allowCustomActionObjectsMiddleWare, epicMiddleware),
    ...enhancer
  )
);

epicMiddleware.run(rootEpic);
