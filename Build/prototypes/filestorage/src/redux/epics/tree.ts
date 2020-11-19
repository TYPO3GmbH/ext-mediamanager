import { ActionsObservable } from 'redux-observable';
import * as fromTree from '../ducks/tree';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { Action } from 'redux';

export const fetchTreeData = (
  action$: ActionsObservable<fromTree.LoadTreeData>
) => {
  let isInit = false;
  return action$.ofType(fromTree.LOAD_TREE_DATA).pipe(
    tap(action => (isInit = action.init)),
    switchMap(action => ajax.getJSON<Typo3Node[]>(action.url)),

    mergeMap(data => {
      const actions: Action[] = [new fromTree.LoadTreeDataSuccess(data)];
      if (isInit && data.length > 0) {
        actions.push(new fromTree.ExpandTreeNode(data[0]));
      }
      return actions;
    }),
    catchError(error => of(new fromTree.LoadTreeDataFailure(error.message)))
  );
};
