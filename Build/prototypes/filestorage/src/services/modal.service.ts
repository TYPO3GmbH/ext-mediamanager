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

import { fromEvent, Observable } from 'rxjs';
import { ModalData } from '../../../shared/src/types/modal-data';

import { filter, map, take } from 'rxjs/operators';
import { ShowModalMessage } from '../../../shared/src/types/show-modal-message';
import {
  CloseModalMessage,
  MODAL_CLOSED_MESSAGE_TYPE,
} from '../../../shared/src/types/close-modal-message';
import { MessageHandler } from '../../../shared/src/lib/message-handler';

export class ModalService {
  openModal(modalData: ModalData): Observable<CloseModalMessage> {
    MessageHandler.sendPostMessage([top], new ShowModalMessage(modalData));
    return fromEvent<MessageEvent<CloseModalMessage>>(window, 'message').pipe(
      map(event => event.data),
      filter(data => MODAL_CLOSED_MESSAGE_TYPE === data.type),
      take(1)
    );
  }
}
