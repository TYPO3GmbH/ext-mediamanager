import { ActionsObservable, StateObservable } from 'redux-observable';
import * as fromActions from '../ducks/global-actions';
import { ignoreElements, mergeMap, switchMap } from 'rxjs/operators';
import * as fromTree from '../ducks/tree';
import * as fromList from '../ducks/list';
import { RootState } from '../ducks';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { FlashMessagesService } from '../../services/flash-messages.service';

export const reload = (
  action$: ActionsObservable<fromActions.Reload>
): Observable<Action> => {
  return action$
    .ofType(fromActions.RELOAD)
    .pipe(
      mergeMap(() => [
        new fromTree.LoadTreeData(false),
        new fromList.ReloadListData(),
      ])
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
