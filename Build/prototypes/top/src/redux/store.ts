/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './ducks';
import { rootEpic } from './epics';

const allowCustomActionObjectsMiddleWare: Middleware = () => next => (
  action: Action
) => {
  next({ ...action });
};

const epicMiddleware = createEpicMiddleware();

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
