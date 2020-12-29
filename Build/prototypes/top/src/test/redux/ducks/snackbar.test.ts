import { expect } from '@open-wc/testing';
import { Action } from 'redux';
import * as fromSnackbar from '../../../redux/ducks/snackbar';

describe('Snackbar reducer', () => {
  it('can return the initial state', () => {
    const state = fromSnackbar.snackbarReducer(undefined, {} as Action);
    const expectedState: fromSnackbar.SnackbarState = {
      open: false,
    };
    expect(state).to.be.eql(expectedState);
  });

  it('can show snackbar', () => {
    const action = new fromSnackbar.ShowSnackbar({});
    const state = fromSnackbar.snackbarReducer(undefined, action);

    expect(state.open).to.be.true;
  });

  it('can close snackbar', () => {
    const initialState: fromSnackbar.SnackbarState = {
      open: true,
    };

    const action = new fromSnackbar.CloseSnackbar();
    const state = fromSnackbar.snackbarReducer(initialState, action);

    expect(state.open).to.be.false;
  });
});
