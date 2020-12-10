import { expect } from '@open-wc/testing';
import * as fromLayout from '../../../src/redux/ducks/layout';
import { Action } from 'redux';

describe('Layout reducer', () => {
  it('can return the initial state', () => {
    const state = fromLayout.layoutReducer(undefined, {} as Action);

    const expectedState = {
      sidebarWidth: 25,
      sidebarVisible: true,
    };

    expect(state).to.be.eql(expectedState);
  });

  it('can set sidebar width', () => {
    const action = new fromLayout.SetSidebarWidth(77);
    const state = fromLayout.layoutReducer(undefined, action);

    expect(state.sidebarWidth).to.be.eql(77);
  });

  it('can toggle visible sidebar', () => {
    const action = new fromLayout.ToggleSidebar();
    const state = fromLayout.layoutReducer(undefined, action);

    expect(state.sidebarVisible).to.be.eql(false);
  });

  it('can toggle hidden sidebar', () => {
    const action = new fromLayout.ToggleSidebar();
    const initialState: fromLayout.LayoutState = {
      sidebarVisible: false,
      sidebarWidth: 25,
    };
    const state = fromLayout.layoutReducer(initialState, action);

    expect(state.sidebarVisible).to.be.eql(true);
  });
});
