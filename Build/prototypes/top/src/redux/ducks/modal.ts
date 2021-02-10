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

import { Action } from 'redux';
import { ModalData } from '../../../../shared/src/types/modal-data';
import { createSelector } from 'reselect';
import { RootState } from './index';

export const SHOW_MODAL = '[MODAL] SHOW';
export const CLOSE_MODAL = '[MODAL] CLOSE';
export const MODAL_ACTION = '[MODAL] ACTION';

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
  constructor(public data: ModalData) {}
}

export class CloseModal implements Action {
  readonly action = 'close';
  readonly data = {};
  readonly type = CLOSE_MODAL;
}

export class ModalAction implements Action {
  readonly type = MODAL_ACTION;
  constructor(
    public action: string,
    public data?: { [key: string]: string | Blob }
  ) {}
}

export type Actions = ShowModal | CloseModal | ModalAction;

const modalSelector = (state: RootState) => state.modal;

export const getModalData = createSelector(
  modalSelector,
  modal => modal.data ?? null
);

export const getActionButtons = createSelector(
  getModalData,
  modalData => modalData?.modalButtons ?? []
);
