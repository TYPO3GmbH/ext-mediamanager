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
import * as fromTree from '../ducks/tree';
import {
  catchError,
  distinctUntilChanged,
  ignoreElements,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { Action } from 'redux';
import * as fromList from '../ducks/list';
import { getUrl } from '../../services/backend-url.service';
import { ApiService } from '../../services/api.service';
import { RootState } from '../ducks';

export const fetchTreeData = (
  action$: ActionsObservable<fromTree.LoadTreeData>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  let isInit = false;
  return action$.ofType(fromTree.LOAD_TREE_DATA).pipe(
    tap(action => (isInit = action.init)),
    switchMap(() =>
      dependencies.apiService.getJSON<Typo3Node[]>(getUrl('treeUrl')).pipe(
        mergeMap(data => {
          const actions: Action[] = [new fromTree.LoadTreeDataSuccess(data)];
          if (isInit && data.length > 0) {
            const node = data[0];
            node.parentsStateIdentifier = [];

            actions.push(new fromTree.ExpandTreeNode(node.identifier));
            actions.push(new fromTree.SelectTreeNode(node.identifier));
            actions.push(new fromList.LoadListData(node.folderUrl));
          }
          return actions;
        }),
        catchError(error => of(new fromTree.LoadTreeDataFailure(error.message)))
      )
    )
  );
};

export const selectTreeNode = (
  action$: ActionsObservable<fromTree.SelectTreeNode>
): Observable<void> => {
  return action$.ofType(fromTree.SELECT_TREE_NODE).pipe(
    distinctUntilChanged(),
    tap(action => (window.location.hash = action.identifier)),
    ignoreElements()
  );
};

export const treeActions = [fetchTreeData, selectTreeNode];
