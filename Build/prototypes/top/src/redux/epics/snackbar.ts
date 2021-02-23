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

import { ActionsObservable } from 'redux-observable';
import * as fromSnackbar from '../ducks/snackbar';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ignoreElements, tap } from 'rxjs/operators';
import { IframeHelper } from '../../../../shared/src/lib/iframe-helper';
import { MessageHandler } from '../../../../shared/src/lib/message-handler';
import { SnackbarActionMessage } from '../../../../shared/src/types/snackbar-action-message';
import { SnackbarButton } from '../../../../shared/src/types/snackbar-data';
import { store } from '../store';
import { SnackbarAction } from '../ducks/snackbar';
import {
  ImmediateAction,
  Typo3NotificationAction,
} from '../../../../shared/src/types/typo3-notification-action';

export const snackbarAction = (
  action$: ActionsObservable<fromSnackbar.SnackbarAction>
): Observable<Action> => {
  return action$.ofType(fromSnackbar.SNACKBAR_ACTION).pipe(
    tap(action => {
      const messageData = new SnackbarActionMessage(
        action.action,
        action.data as SnackbarButton
      );

      MessageHandler.sendPostMessage(
        [IframeHelper.getContentIframe(), IframeHelper.getModalIframe()],
        messageData
      );
    }),
    ignoreElements()
  );
};

export const showSnackbar = (
  action$: ActionsObservable<fromSnackbar.ShowSnackbar>
): Observable<Action> => {
  return action$.ofType(fromSnackbar.SHOW_SNACKBAR).pipe(
    tap(action => {
      const notificationButtons = (action.data.buttons ?? []).map(button => {
        const callback = () => {
          store.dispatch(new SnackbarAction(button.action, button));
        };

        return {
          label: button.label,
          action: new ImmediateAction(callback),
        } as Typo3NotificationAction;
      });

      // @ts-ignore
      window.TYPO3.Notification.showMessage(
        action.data.title,
        action.data.message,
        action.data.severity,
        action.data.duration,
        notificationButtons
      );
    }),
    ignoreElements()
  );
};

export const snackbarActions = [showSnackbar, snackbarAction];
