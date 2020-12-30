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
