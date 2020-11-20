import { ActionsObservable } from 'redux-observable';

import * as fromList from '../ducks/list';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable, of } from 'rxjs';
import { Action } from 'redux';

export const fetchListData = (
  action$: ActionsObservable<fromList.LoadListData>
): Observable<Action> => {
  return action$.ofType(fromList.LOAD_LIST_DATA).pipe(
    switchMap(action =>
      ajax.getJSON<ListItem[]>(action.url).pipe(
        mergeMap(data => [
          new fromList.ClearSelection(),
          new fromList.LoadListDataSuccess(data),
        ]),
        catchError(error => of(new fromList.LoadListDataFailure(error.message)))
      )
    )
  );
};
