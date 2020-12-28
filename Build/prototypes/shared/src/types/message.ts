export const SHOW_MODAL_MESSAGE_TYPE = 'typo3-show-modal';

export interface Message<T = unknown> {
  type: T;
}
