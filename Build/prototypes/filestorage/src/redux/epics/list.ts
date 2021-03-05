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

import { ActionsObservable, StateObservable } from 'redux-observable';
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
import { Observable, of } from 'rxjs';
import { Action } from 'redux';
import { RootState } from '../ducks/reducers';
import { getUrl } from '../../services/backend-url.service';
import { ApiService } from '../../services/api.service';
import { ListActions, TreeActions } from '../ducks/actions';
import { getSearchTermString, isInSearchMode } from '../ducks/selectors/list';
import {
  getLastSelectedTreeNodeId,
  getSelectedTreeNode,
  getTreeNodes,
} from '../ducks/selectors/tree';

export const fetchListData = (
  action$: ActionsObservable<ListActions.LoadListData>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(ListActions.LOAD_LIST_DATA).pipe(
    switchMap(action =>
      dependencies.apiService.getJSON<ListItem[]>(action.url).pipe(
        mergeMap(data => [
          new ListActions.ClearSelection(),
          new ListActions.LoadListDataSuccess(data),
        ]),
        catchError(error =>
          of(new ListActions.LoadListDataFailure(error.message))
        )
      )
    )
  );
};

export const selectFirstNodeOnFetchListDataError = (
  action$: ActionsObservable<ListActions.LoadListDataFailure>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(ListActions.LOAD_LIST_DATA_FAILURE).pipe(
    filter(action => action.error.includes('404')),
    debounceTime(100),
    withLatestFrom(state$),
    map(([, state]) => state),
    filter(state => getTreeNodes(state).length > 0),
    filter(state => null !== getLastSelectedTreeNodeId(state)),
    filter(state => null === getSelectedTreeNode(state)),
    map(state => getTreeNodes(state)[0]),
    mergeMap(node => [
      new TreeActions.SelectTreeNode(node.identifier),
      new ListActions.LoadListData(node.folderUrl),
    ])
  );
};

export const searchTermChanged = (
  action$: ActionsObservable<ListActions.SearchTermChanged>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(ListActions.SEARCH_TERM_CHANGED).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    withLatestFrom(state$),
    map(([action, state]) => {
      if ('' !== action.searchTerm) {
        return new ListActions.SearchFiles(action.searchTerm);
      }
      const node = getSelectedTreeNode(state) || getTreeNodes(state)[0];
      return new ListActions.LoadListData(node.folderUrl);
    })
  );
};

export const searchFiles = (
  action$: ActionsObservable<ListActions.SearchFiles>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(ListActions.SEARCH_FILES).pipe(
    switchMap(action => {
      const url = getUrl('searchFilesUrl', {
        search: action.searchTerm,
      });
      return dependencies.apiService.getJSON<ListItem[]>(url).pipe(
        mergeMap(data => [
          new ListActions.ClearSelection(),
          new ListActions.SearchFilesSuccess(data),
        ]),
        catchError(error =>
          of(new ListActions.SearchFilesFailure(error.message))
        )
      );
    })
  );
};

export const reloadListData = (
  action$: ActionsObservable<ListActions.ReloadListData>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(ListActions.RELOAD_LIST_DATA).pipe(
    withLatestFrom(state$),
    map(([, state]) => {
      if (isInSearchMode(state)) {
        return new ListActions.SearchFiles(getSearchTermString(state));
      }
      const node = getSelectedTreeNode(state) || getTreeNodes(state)[0];
      return new ListActions.LoadListData(node.folderUrl);
    })
  );
};

export const listActions = [
  fetchListData,
  selectFirstNodeOnFetchListDataError,
  searchTermChanged,
  searchFiles,
  reloadListData,
];
