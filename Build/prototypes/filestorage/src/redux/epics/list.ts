import { ActionsObservable, StateObservable } from 'redux-observable';

import * as fromList from '../ducks/list';
import * as fromTree from '../ducks/tree';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
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
import { getUrl } from '../../services/backend-url.service';

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

export const searchFiles = (
  action$: ActionsObservable<fromList.SearchFiles>
): Observable<Action> => {
  return action$.ofType(fromList.SEARCH_FILES).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(action => {
      const params = new URLSearchParams();
      params.append('search', action.searchTerm);

      const url = getUrl('searchFilesUrl') + '&' + params.toString();
      return ajax.getJSON<ListItem[]>(url).pipe(
        mergeMap(data => [
          new fromList.ClearSelection(),
          new fromList.SearchFilesSuccess(data),
        ]),
        catchError(error => of(new fromList.SearchFilesFailure(error.message)))
      );
    })
  );
};

export const searchFilesReset = (
  action$: ActionsObservable<fromList.SearchFilesReset>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(fromList.SEARCH_FILES_RESET).pipe(
    withLatestFrom(state$),
    map(
      ([, state]) =>
        fromTree.getSelectedTreeNode(state) || fromTree.getTreeNodes(state)[0]
    ),
    map(node => new fromList.LoadListData(node.folderUrl))
  );
};

export const reloadListData = (
  action$: ActionsObservable<fromList.ReloadListData>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(fromList.RELOAD_LIST_DATA).pipe(
    withLatestFrom(state$),
    map(([, state]) => {
      if (fromList.isInSearchMode(state)) {
        return new fromList.SearchFiles(fromList.getSearchTermString(state));
      }
      const node =
        fromTree.getSelectedTreeNode(state) || fromTree.getTreeNodes(state)[0];
      return new fromList.LoadListData(node.folderUrl);
    })
  );
};

export const listActions = [
  fetchListData,
  selectFirstNodeOnfetchListDataError,
  searchFiles,
  searchFilesReset,
  reloadListData,
];
