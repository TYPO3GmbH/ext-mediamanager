export interface ModalButton {
  label: string;
  color: string;
  action: string;
}

export interface ConfirmModalData {
  headline: string;
  message: string;
  modalButtons?: ModalButton[];
  content?: string;
}
