import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
} from 'redux';
import { rootReducer } from './ducks';

// @ts-ignore
const allowCustomActionObjectsMiddleWare: Middleware = (
  store: Store
) => next => (action: Action) => {
  next({ ...action });
};

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(allowCustomActionObjectsMiddleWare),
    process.env.NODE_ENV === 'development'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : null
  )
);
