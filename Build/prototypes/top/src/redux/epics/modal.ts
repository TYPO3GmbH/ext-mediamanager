import { ActionsObservable } from 'redux-observable';
import * as fromModal from '../ducks/modal';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ignoreElements, tap } from 'rxjs/operators';
import { IframeHelper } from '../../../../shared/src/lib/iframe-helper';
import { CloseModalMessage } from '../../../../shared/src/types/close-modal-message';
import { MessageHandler } from '../../../../shared/src/lib/message-handler';

export const closeModal = (
  action$: ActionsObservable<fromModal.CloseModal | fromModal.ModalAction>
): Observable<Action> => {
  return action$.ofType(fromModal.CLOSE_MODAL, fromModal.MODAL_ACTION).pipe(
    tap(action => {
      const messageData = new CloseModalMessage(action.action, action.data);
      MessageHandler.sendPostMessage(
        [IframeHelper.getContentIframe() as Window],
        messageData
      );
    }),
    ignoreElements()
  );
};
