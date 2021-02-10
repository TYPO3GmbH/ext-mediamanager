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
import * as fromList from '../../../src/redux/ducks/list';
import { ListState } from '../../../src/redux/ducks/list';

describe('List reducer', () => {
  it('can return the initial state', () => {
    const state = fromList.listReducer(undefined, {} as fromList.Actions);
    const expectedState = {
      items: [],
      selectedItemIds: [],
      loading: false,
      error: null,
      searchTerm: null,
    };

    expect(state).to.be.eql(expectedState);
  });

  it('can handle `LoadListData`', () => {
    const action = new fromList.LoadListData('http://typo3.test');
    const mockedState = {
      searchTerm: 'foo',
      items: [{ identifier: 'id-1' }],
    } as ListState;
    const state = fromList.listReducer(mockedState, action);

    expect(state.loading).to.be.true;
    expect(state.searchTerm).to.be.null;
    expect(state.items).to.have.length(0);
  });

  it('can handle `LoadListDataSuccess`', () => {
    const listItems = [{ identifier: 'id_12' }] as ListItem[];
    const action = new fromList.LoadListDataSuccess(listItems);
    const state = fromList.listReducer(undefined, action);

    expect(state.items).to.be.eqls(listItems);
    expect(state.loading).to.be.false;
  });

  it('can handle `ClearSelection`', () => {
    const action = new fromList.ClearSelection();
    const prevState = {
      selectedItemIds: ['id1'],
    } as ListState;
    const state = fromList.listReducer(prevState, action);

    expect(state.selectedItemIds).to.be.eqls([]);
  });

  it('can handle `LoadListDataFailure`', () => {
    const action = new fromList.LoadListDataFailure('error');
    const state = fromList.listReducer(undefined, action);

    expect(state.error).to.be.eqls('error');
    expect(state.loading).to.be.false;
  });

  it('can handle `SearchFiles`', () => {
    const action = new fromList.SearchFiles('foo');
    const state = fromList.listReducer(undefined, action);

    expect(state.loading).to.be.true;
    expect(state.searchTerm).to.be.eq('foo');
    expect(state.items).to.have.length(0);
  });

  it('can handle `SearchFilesSuccess`', () => {
    const listItems = [{ identifier: 'id_12' }] as ListItem[];
    const action = new fromList.SearchFilesSuccess(listItems);
    const state = fromList.listReducer(undefined, action);

    expect(state.items).to.be.eqls(listItems);
    expect(state.loading).to.be.false;
  });

  it('can handle `SearchFilesFailure`', () => {
    const action = new fromList.SearchFilesFailure('error');
    const state = fromList.listReducer(undefined, action);

    expect(state.error).to.be.eqls('error');
    expect(state.loading).to.be.false;
  });
});
