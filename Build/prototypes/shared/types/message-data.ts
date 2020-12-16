export const SHOW_MODAL_MESSAGE_TYPE = 'typo3-show-modal';
export const MODAL_CLOSED_MESSAGE_TYPE = 'typo3-modal-closed';

export class MessageData<T = undefined> {
  constructor(public readonly type: string, public detail?: T) {}
}
