import { compose, createStore } from 'redux';
import { rootReducer } from './ducks';

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : compose
);
