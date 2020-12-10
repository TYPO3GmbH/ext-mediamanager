import { Action } from 'redux';
import { ConfirmModalData } from '../../../../shared/types/confirm-modal-data';

export const SHOW_MODAL = '[MODAL] SHOW';
export const CLOSE_MODAL = '[MODAL] CLOSE';
export const CONFIRM_MODAL = '[MODAL] CONFIRM';

export type ModalState = Readonly<{
  open: boolean;
  data?: ConfirmModalData;
}>;

const initialState: ModalState = {
  open: false,
};

export const modalReducer = (
  state = initialState,
  action: Actions
): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        data: action.data,
        open: true,
      };
    case CLOSE_MODAL:
    case CONFIRM_MODAL:
      return {
        ...state,
        open: false,
        data: undefined,
      };
    default:
      return state;
  }
};

export class ShowModal implements Action {
  readonly type = SHOW_MODAL;
  constructor(public data: ConfirmModalData) {}
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}

export class ConfirmModal implements Action {
  readonly type = CONFIRM_MODAL;
}

export type Actions = ShowModal | CloseModal | ConfirmModal;
