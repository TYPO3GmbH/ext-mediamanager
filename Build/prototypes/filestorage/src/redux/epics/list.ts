import { ActionsObservable, StateObservable } from 'redux-observable';

import * as fromList from '../ducks/list';
import * as fromTree from '../ducks/tree';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable, of } from 'rxjs';
import { Action } from 'redux';
import { RootState } from '../ducks';

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

export const selectFirstNodeOnfetchListDataError = (
  action$: ActionsObservable<fromList.LoadListDataFailure>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(fromList.LOAD_LIST_DATA_FAILURE).pipe(
    filter(action => action.error.includes('404')),
    withLatestFrom(state$),
    map(([, state]) => state),
    filter(state => fromTree.getTreeNodes(state).length > 0),
    filter(state => null !== fromTree.getLastSelectedTreeNodeId(state)),
    filter(state => null === fromTree.getSelectedTreeNode(state)),
    map(state => fromTree.getTreeNodes(state)[0]),
    mergeMap(node => [
      new fromTree.SelectTreeNode(node.identifier),
      new fromList.LoadListData(node.folderUrl),
    ])
  );
};

export const listActions = [fetchListData, selectFirstNodeOnfetchListDataError];
