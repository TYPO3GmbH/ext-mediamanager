import { ActionsObservable } from 'redux-observable';
import * as fromTree from '../ducks/tree';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable, of } from 'rxjs';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { Action } from 'redux';
import * as fromList from '../ducks/list';

export const fetchTreeData = (
  action$: ActionsObservable<fromTree.LoadTreeData>
): Observable<Action> => {
  let isInit = false;
  return action$.ofType(fromTree.LOAD_TREE_DATA).pipe(
    tap(action => (isInit = action.init)),
    switchMap(action =>
      ajax.getJSON<Typo3Node[]>(action.url).pipe(
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
