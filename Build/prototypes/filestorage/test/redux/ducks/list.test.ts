import { expect } from '@open-wc/testing';
import * as fromList from '../../../src/redux/ducks/list';

describe('List reducer', () => {
  it('can return the initial state', () => {
    const state = fromList.listReducer(undefined, {} as fromList.Actions);
    const expectedState = {
      items: [],
      selectedItemIds: [],
      loading: false,
      error: null,
    };

    expect(state).to.be.eql(expectedState);
  });

  it('sets list state to loading on `LoadListData`', () => {
    const action = new fromList.LoadListData('http://typo3.test');
    const state = fromList.listReducer(undefined, action);

    expect(state.loading).to.be.true;
  });

  it('sets list data on `LoadListDataSuccess`', () => {
    const listItems = [{ identifier: 'id_12' }] as ListItem[];
    const action = new fromList.LoadListDataSuccess(listItems);
    const state = fromList.listReducer(undefined, action);

    expect(state.items).to.be.eqls(listItems);
    expect(state.loading).to.be.false;
  });

  it('sets list state to error on `LoadListDataFailure`', () => {
    const action = new fromList.LoadListDataFailure('error');
    const state = fromList.listReducer(undefined, action);

    expect(state.error).to.be.eqls('error');
    expect(state.loading).to.be.false;
  });

  it('sets selectedItemIds on `SetSelection`', () => {
    const action = new fromList.SetSelection(['id']);
    const state = fromList.listReducer(undefined, action);

    expect(state.selectedItemIds).to.be.eqls(['id']);
  });

  it('clears selectedItemIds on `ClearSelection`', () => {
    const action = new fromList.ClearSelection();
    const prevState = {
      items: [],
      selectedItemIds: ['id1'],
      loading: false,
      error: null,
    };
    const state = fromList.listReducer(prevState, action);

    expect(state.selectedItemIds).to.be.eqls([]);
  });
});
