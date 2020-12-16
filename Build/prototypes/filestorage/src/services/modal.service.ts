import { fromEvent, Observable } from 'rxjs';
import { ModalData } from '../../../shared/types/modal-data';

import { filter, map, take } from 'rxjs/operators';
import { ShowModalMessage } from '../../../shared/types/show-modal-message';
import {
  CloseModalMessage,
  MODAL_CLOSED_MESSAGE_TYPE,
} from '../../../shared/types/close-modal-message';

export class ModalService {
  openModal(modalData: ModalData): Observable<CloseModalMessage> {
    window.top.postMessage(new ShowModalMessage(modalData), '*');
    return fromEvent<MessageEvent<CloseModalMessage>>(window, 'message').pipe(
      map(event => event.data),
      filter(data => MODAL_CLOSED_MESSAGE_TYPE === data.type),
      take(1)
    );
  }
}
