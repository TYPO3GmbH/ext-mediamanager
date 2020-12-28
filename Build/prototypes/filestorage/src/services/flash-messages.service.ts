import { ajax } from 'rxjs/ajax';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  timeout,
} from 'rxjs/operators';
import { EMPTY, fromEvent, Observable } from 'rxjs';
import { getUrl } from './backend-url.service';
import * as fromGlobalActions from '../redux/ducks/global-actions';
import { MessageHandler } from '../../../shared/src/lib/message-handler';
import { ShowSnackbarMessage } from '../../../shared/src/types/show-snackbar-message';
import { translate } from './translation.service';
import {
  SNACKBAR_ACTION_MESSAGE_TYPE,
  SnackbarActionMessage,
} from '../../../shared/src/types/snackbar-action-message';

interface Message {
  message: string;
  title: string;
  severity: number;
}

export class FlashMessagesService {
  fetchFlashMessages(
    action: fromGlobalActions.LoadFlashMessages
  ): Observable<any> {
    const flashMessagesUrl: string = getUrl('flashMessagesUrl');

    return ajax.getJSON<Message[]>(flashMessagesUrl).pipe(
      map(messages => {
        const showSnackbarMessage = new ShowSnackbarMessage({
          title: action.message,
          message: messages
            .map(errorMessage => errorMessage.message)
            .join('<br />'),
          variant: action.variant,
          duration: 5000,
        });

        if (action.undoAction) {
          showSnackbarMessage.data.buttons = [
            {
              label: translate('undo'),
              color: 'default',
              action: 'undo',
              data: action.undoAction,
            },
          ];
        }

        MessageHandler.sendPostMessage([top], showSnackbarMessage);
        return action.undoAction;
      }),
      filter(undoAction => typeof undoAction != 'undefined'),
      switchMap(undoAction => {
        return fromEvent<MessageEvent<SnackbarActionMessage>>(
          window,
          'message'
        ).pipe(
          map(event => event.data),
          filter(data => SNACKBAR_ACTION_MESSAGE_TYPE == data.type),
          timeout(5000),
          take(1),
          catchError(() => EMPTY),
          map(() => action.undoAction)
        );
      })
    );
  }
}
