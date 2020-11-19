import { ActionsObservable } from 'redux-observable';

import * as fromActions from '../ducks/file-actions';
import { catchError, finalize, map, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import * as fromGlobal from '../ducks/global-actions';
import { Observable, of } from 'rxjs';
import { Action } from 'redux';

export const renameFile = (
  action$: ActionsObservable<fromActions.RenameFile>
): Observable<Action> => {
  return action$.ofType(fromActions.RENAME_FILE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('data[rename][0][data]', action.identifier);
      formData.append('data[rename][0][target]', action.name);
      return ajax.post(action.fileActionUrl, formData);
    }),
    mergeMap(() => [
      new fromGlobal.Reload(),
      new fromGlobal.LoadFlashMessages(),
    ]),
    catchError(() => of(new fromGlobal.LoadFlashMessages()))
  );
};
