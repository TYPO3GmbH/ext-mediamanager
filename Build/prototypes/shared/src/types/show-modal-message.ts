import { ModalData } from './modal-data';
import { Message } from './message';

export const SHOW_MODAL_MESSAGE_TYPE = 'typo3-show-modal';

export class ShowModalMessage implements Message {
  readonly type = SHOW_MODAL_MESSAGE_TYPE;
  constructor(public data: ModalData) {}
}
