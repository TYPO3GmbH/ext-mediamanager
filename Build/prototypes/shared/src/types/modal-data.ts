import { Color } from '../../../../packages/button/src/typo3-base-button';

export interface ModalButton {
  label: string;
  color: Color;
  action: string;
}

export enum ModalType {
  CONFIRM = 'confirm',
  HTML = 'html',
}

export interface ModalData {
  isForm?: boolean;
  type: ModalType;
  headline: string;
  content: string;
  modalButtons?: ModalButton[];
}
