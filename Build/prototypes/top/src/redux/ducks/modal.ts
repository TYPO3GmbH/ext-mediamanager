import { Action } from 'redux';
import { ConfirmModalData } from '../../../../shared/types/confirm-modal-data';
import { createSelector } from 'reselect';
import { RootState } from './index';

export const SHOW_MODAL = '[MODAL] SHOW';
export const CLOSE_MODAL = '[MODAL] CLOSE';
export const MODAL_ACTION = '[MODAL] ACTION';

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
    case MODAL_ACTION:
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

export class ModalAction implements Action {
  constructor(public action: string) {}
  readonly type = MODAL_ACTION;
}

export type Actions = ShowModal | CloseModal | ModalAction;

const modalSelector = (state: RootState) => state.modal;

export const getActionButtons = createSelector(
  modalSelector,
  modal => modal.data?.modalButtons ?? []
);
