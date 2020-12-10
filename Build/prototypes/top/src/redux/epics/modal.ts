import { ActionsObservable } from 'redux-observable';
import * as fromModal from '../ducks/modal';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ignoreElements, tap } from 'rxjs/operators';
import { IframeHelper } from '../../lib/iframe-helper';
import { MessageData } from '../../../../shared/types/message-data';

export const closeModal = (
  action$: ActionsObservable<fromModal.CloseModal | fromModal.ConfirmModal>
): Observable<Action> => {
  return action$.ofType(fromModal.CLOSE_MODAL, fromModal.CONFIRM_MODAL).pipe(
    tap(action => {
      const confirm = fromModal.CONFIRM_MODAL === action.type;
      const messageData = new MessageData('typo3-modal-closed', {
        confirm: confirm,
      });
      IframeHelper.getContentIframe()?.postMessage(messageData, '*');
    }),
    ignoreElements()
  );
};
