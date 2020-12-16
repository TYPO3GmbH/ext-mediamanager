import { ActionsObservable } from 'redux-observable';
import * as fromModal from '../ducks/modal';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ignoreElements, tap } from 'rxjs/operators';
import { IframeHelper } from '../../lib/iframe-helper';
import {
  MessageData,
  MODAL_CLOSED_MESSAGE_TYPE,
} from '../../../../shared/types/message-data';

export const closeModal = (
  action$: ActionsObservable<fromModal.CloseModal | fromModal.ModalAction>
): Observable<Action> => {
  return action$.ofType(fromModal.CLOSE_MODAL, fromModal.MODAL_ACTION).pipe(
    tap(action => {
      const actionName =
        fromModal.MODAL_ACTION === action.type ? action.action : '';
      const messageData = new MessageData(MODAL_CLOSED_MESSAGE_TYPE, {
        action: actionName,
      });
      IframeHelper.getContentIframe()?.postMessage(messageData, '*');
    }),
    ignoreElements()
  );
};
