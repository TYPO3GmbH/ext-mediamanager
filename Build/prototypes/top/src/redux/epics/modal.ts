import { ActionsObservable } from 'redux-observable';
import * as fromModal from '../ducks/modal';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ignoreElements, tap } from 'rxjs/operators';
import { IframeHelper } from '../../lib/iframe-helper';
import { CloseModalMessage } from '../../../../shared/types/close-modal-message';

export const closeModal = (
  action$: ActionsObservable<fromModal.CloseModal | fromModal.ModalAction>
): Observable<Action> => {
  return action$.ofType(fromModal.CLOSE_MODAL, fromModal.MODAL_ACTION).pipe(
    tap(action => {
      const messageData = new CloseModalMessage(action.action);
      IframeHelper.getContentIframe()?.postMessage(messageData, '*');
    }),
    ignoreElements()
  );
};
