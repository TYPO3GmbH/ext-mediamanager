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
import { MessageHandler } from '../../../shared/src/lib/message-handler';
import { translate } from './translation.service';
import {
  SNACKBAR_ACTION_MESSAGE_TYPE,
  SnackbarActionMessage,
} from '../../../shared/src/types/snackbar-action-message';
import { isEqual } from 'lodash-es';
import { ApiService } from './api.service';
import { ShowSnackbarMessage } from '../../../shared/src/types/show-snackbar-message';
import { FileActions, GlobalActions } from '../redux/ducks/actions';

interface Message {
  message: string;
  title: string;
  severity: number;
}

export class FlashMessagesService {
  constructor(protected apiService: ApiService) {}

  fetchFlashMessages(
    action: GlobalActions.LoadFlashMessages
  ): Observable<unknown> {
    const flashMessagesUrl: string = getUrl('flashMessagesUrl');
    return this.apiService.getJSON<Message[]>(flashMessagesUrl).pipe(
      map(messages => {
        const showSnackbarMessage = new ShowSnackbarMessage({
          title: action.message,
          message: messages
            .map(errorMessage => errorMessage.message)
            .join('\n'),
          severity: action.severity,
          duration: 5,
          dismissible: true,
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
          filter(data =>
            isEqual(
              (data.actionData.data as FileActions.UndoFilesAction).formData,
              (undoAction as FileActions.UndoFilesAction)!.formData
            )
          ),
          timeout(5000),
          take(1),
          catchError(() => EMPTY),
          map(() => action.undoAction)
        );
      })
    );
  }
}
