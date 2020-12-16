import { Message } from './message';

export const MODAL_CLOSED_MESSAGE_TYPE = 'typo3-modal-closed';

export class CloseModalMessage implements Message {
  readonly type = MODAL_CLOSED_MESSAGE_TYPE;
  constructor(public action: string, public data?: {}) {}
}
