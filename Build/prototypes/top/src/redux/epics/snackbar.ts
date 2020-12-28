import { ActionsObservable } from 'redux-observable';
import * as fromSnackbar from '../ducks/snackbar';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ignoreElements, tap } from 'rxjs/operators';
import { IframeHelper } from '../../../../shared/src/lib/iframe-helper';
import { MessageHandler } from '../../../../shared/src/lib/message-handler';
import { SnackbarActionMessage } from '../../../../shared/src/types/snackbar-action-message';
import { SnackbarButton } from '../../../../shared/src/types/snackbar-data';

export const snackbarAction = (
  action$: ActionsObservable<fromSnackbar.SnackbarAction>
): Observable<Action> => {
  return action$.ofType(fromSnackbar.SNACKBAR_ACTION).pipe(
    tap(action => {
      // @todo send post message to content frame and modal iframe
      const messageData = new SnackbarActionMessage(
        action.action,
        action.data as SnackbarButton
      );
      MessageHandler.sendPostMessage(
        IframeHelper.getContentIframe(),
        messageData
      );
    }),
    ignoreElements()
  );
};
