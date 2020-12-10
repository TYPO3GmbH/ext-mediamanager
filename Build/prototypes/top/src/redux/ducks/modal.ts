import { Action } from 'redux';

export const SHOW_MODAL = '[MODAL] SHOW';
export const CLOSE_MODAL = '[MODAL] CLOSE';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalData {}

export type ModalState = Readonly<{
  open: boolean;
  data?: ModalData;
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
  constructor(public data: ModalData) {}
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}

export type Actions = ShowModal | CloseModal;
