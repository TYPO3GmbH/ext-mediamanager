import { ActionsObservable, StateObservable } from 'redux-observable';
import * as fromActions from '../ducks/global-actions';
import {
  ignoreElements,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as fromTree from '../ducks/tree';
import * as fromList from '../ducks/list';
import { RootState } from '../ducks';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { FlashMessagesService } from '../../services/flash-messages.service';

export const reload = (
  action$: ActionsObservable<fromActions.Reload>,
  state$: StateObservable<RootState>
): Observable<Action> => {
  return action$.ofType(fromActions.RELOAD).pipe(
    withLatestFrom(state$),
    mergeMap(([, state]) => {
      const actions: Action[] = [new fromTree.LoadTreeData(false)];
      const selectedNode = fromTree.getSelectedTreeNode(state);
      if (selectedNode) {
        actions.push(new fromList.LoadListData(selectedNode.folderUrl));
      }
      return actions;
    })
  );
};

export const loadFlashMessages = (
  action$: ActionsObservable<fromActions.LoadFlashMessages>,
  state$: StateObservable<RootState>,
  dependencies: { flashMessagesService: FlashMessagesService }
): Observable<Action> => {
  return action$.ofType(fromActions.LOAD_FLASH_MESSAGES).pipe(
    switchMap(action =>
      dependencies.flashMessagesService.fetchFlashMessages(action)
    ),
    ignoreElements()
  );
};
