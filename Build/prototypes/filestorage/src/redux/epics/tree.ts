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
  distinctUntilChanged,
  ignoreElements,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Node } from '../../../../../types/node';
import { Action } from 'redux';
import { getUrl } from '../../services/backend-url.service';
import { ApiService } from '../../services/api.service';
import { RootState } from '../ducks/reducers';
import { ListActions, TreeActions } from '../ducks/actions';

export const fetchTreeData = (
  action$: ActionsObservable<TreeActions.LoadTreeData>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  let isInit = false;
  return action$.ofType(TreeActions.LOAD_TREE_DATA).pipe(
    tap(action => (isInit = action.init)),
    switchMap(() =>
      dependencies.apiService.getJSON<Node[]>(getUrl('treeUrl')).pipe(
        mergeMap(data => {
          const actions: Action[] = [new TreeActions.LoadTreeDataSuccess(data)];
          if (isInit && data.length > 0) {
            const node = data[0];
            node.parentsStateIdentifier = [];

            actions.push(new TreeActions.ExpandTreeNode(node.identifier));
            actions.push(new TreeActions.SelectTreeNode(node.identifier));
            actions.push(new ListActions.LoadListData(node.folderUrl));
          }
          return actions;
        }),
        catchError(error =>
          of(new TreeActions.LoadTreeDataFailure(error.message))
        )
      )
    )
  );
};

export const selectTreeNode = (
  action$: ActionsObservable<TreeActions.SelectTreeNode>
): Observable<void> => {
  return action$.ofType(TreeActions.SELECT_TREE_NODE).pipe(
    distinctUntilChanged(),
    tap(action => (window.location.hash = action.identifier)),
    ignoreElements()
  );
};

export const treeActions = [fetchTreeData, selectTreeNode];
