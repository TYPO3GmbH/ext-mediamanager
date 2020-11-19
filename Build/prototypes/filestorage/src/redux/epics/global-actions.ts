import { ActionsObservable, StateObservable } from 'redux-observable';
import * as fromActions from '../ducks/global-actions';
import {
  ignoreElements,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as fromTree from '../ducks/tree';
import * as fromList from '../ducks/list';
import { RootState } from '../ducks';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ajax } from 'rxjs/ajax';

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

export const loadFlashMessages = (
  action$: ActionsObservable<fromActions.LoadFlashMessages>
): Observable<Action> => {
  // @ts-ignore
  const flashMessagesUrl: string = window.flashMessagesUrl;

  return action$.ofType(fromActions.LOAD_FLASH_MESSAGES).pipe(
    switchMap(_ => {
      return ajax
        .getJSON<
          {
            message: string;
            title: string;
            severity: number;
          }[]
        >(flashMessagesUrl)
        .pipe(
          tap(messages => {
            messages.forEach(messageData => {
              window.dispatchEvent(
                new CustomEvent('typo3-add-snackbar', {
                  detail: {
                    message: messageData.message,
                    title: messageData.title,
                    variant: messageData.severity === 0 ? 'success' : 'danger',
                  },
                })
              );
            });
          }),
          ignoreElements()
        );
    })
  );
};
