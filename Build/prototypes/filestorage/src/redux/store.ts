import { createStore } from 'redux';
import { rootReducer } from './ducks';

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : null
);
