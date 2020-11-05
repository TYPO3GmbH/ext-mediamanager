import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
} from 'redux';
import { rootReducer } from './ducks';
import thunk from 'redux-thunk';

const allowCustomActionObjectsMiddleWare: Middleware = () => next => (
  action: Action
) => {
  next({ ...action });
};

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
    applyMiddleware(thunk, allowCustomActionObjectsMiddleWare),
    ...enhancer
  )
);
