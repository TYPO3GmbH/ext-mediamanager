import { ActionsObservable, StateObservable } from 'redux-observable';
import * as fromActions from '../ducks/global-actions';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import * as fromTree from '../ducks/tree';
import * as fromList from '../ducks/list';
import { RootState } from '../ducks';
import { Observable } from 'rxjs';
import { Action } from 'redux';

export const reload = (
  action$: ActionsObservable<fromActions.Reload>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(fromActions.RELOAD).pipe(
    withLatestFrom(state$),
    mergeMap(([, state]) => {
      const actions: Action[] = [
        new fromTree.LoadTreeData(state.tree.url, false),
      ];
      if (state.tree.selected) {
        actions.push(new fromList.LoadListData(state.tree.selected.folderUrl));
      }
      return actions;
    })
  );
};
