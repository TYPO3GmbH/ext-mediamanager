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

const allowCustomActionObjectsMiddleWare: Middleware = () => next => (
  action: Action
) => {
  next({ ...action });
};

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    flashMessagesService: new FlashMessagesService(),
    undoActionResolverService: new UndoActionResolverService(),
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
