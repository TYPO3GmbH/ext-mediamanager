import { fromEvent, Observable } from 'rxjs';
import { CloseModal } from '../../../top/src/redux/ducks/modal';
import { ConfirmModalData } from '../../../shared/types/confirm-modal-data';
import {
  MessageData,
  MODAL_CLOSED_MESSAGE_TYPE,
  SHOW_MODAL_MESSAGE_TYPE,
} from '../../../shared/types/message-data';
import { filter, map, take } from 'rxjs/operators';

export class ModalService {
  openModal(modalData: ConfirmModalData): Observable<CloseModal> {
    window.top.postMessage(
      new MessageData<ConfirmModalData>(SHOW_MODAL_MESSAGE_TYPE, modalData),
      '*'
    );
    return fromEvent<MessageEvent<MessageData<CloseModal>>>(
      window,
      'message'
    ).pipe(
      map(event => event.data),
      filter(data => MODAL_CLOSED_MESSAGE_TYPE === data.type),
      take(1),
      map(data => data.detail as CloseModal)
    );
  }
}
