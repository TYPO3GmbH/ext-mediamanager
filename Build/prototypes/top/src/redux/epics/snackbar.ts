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
