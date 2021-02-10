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

import { expect } from '@open-wc/testing';
import { Action } from 'redux';
import * as fromModal from '../../../redux/ducks/modal';

describe('Modal reducer', () => {
  it('can return the initial state', () => {
    const state = fromModal.modalReducer(undefined, {} as Action);
    const expectedState: fromModal.ModalState = {
      open: false,
    };
    expect(state).to.be.eql(expectedState);
  });

  it('can show modal', () => {
    const action = new fromModal.ShowModal({});
    const state = fromModal.modalReducer(undefined, action);

    expect(state.open).to.be.true;
  });

  it('can close modal', () => {
    const initialState: fromModal.ModalState = {
      open: true,
    };

    const action = new fromModal.CloseModal();
    const state = fromModal.modalReducer(initialState, action);

    expect(state.open).to.be.false;
  });
});
