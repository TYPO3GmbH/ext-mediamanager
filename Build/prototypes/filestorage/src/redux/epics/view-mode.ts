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

import { ActionsObservable } from 'redux-observable';
import * as fromViewMode from '../ducks/view-mode';
import { ignoreElements, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const saveViewMode = (
  action$: ActionsObservable<fromViewMode.SetViewMode>
): Observable<void> => {
  return action$.ofType(fromViewMode.SET_VIEW_MODE).pipe(
    tap(action =>
      localStorage.setItem('t3-file-list-view-mode', action.viewmode.toString())
    ),
    ignoreElements()
  );
};
