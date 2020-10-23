import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
} from 'redux';
import { rootReducer } from './ducks';
import thunk from 'redux-thunk';

// @ts-ignore
const allowCustomActionObjectsMiddleWare: Middleware = (
  store: Store
) => next => (action: Action) => {
  next({ ...action });
};

const enhancer = [];
if (
  process.env.NODE_ENV === 'development' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancer.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, allowCustomActionObjectsMiddleWare),
    ...enhancer
  )
);
