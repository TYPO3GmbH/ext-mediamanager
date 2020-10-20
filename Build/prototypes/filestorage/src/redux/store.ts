import { createStore } from 'redux';
import { reducer } from './reducer';

export const store = createStore(
  reducer,
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : null
);
