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
import * as fromViewMode from '../../../src/redux/ducks/view-mode';

describe('ViewMode reducer', () => {
  it('can return the initial state', () => {
    const state = fromViewMode.viewModeReducer(
      undefined,
      {} as fromViewMode.Actions
    );
    const expectedState = {
      mode: fromViewMode.ViewMode.LIST,
      order: {
        field: 'name',
        direction: fromViewMode.OrderDirection.ASC,
      },
    };

    expect(state).to.be.eql(expectedState);
  });

  it('can set tiles view mode', () => {
    const action = new fromViewMode.SetViewMode(fromViewMode.ViewMode.TILES);
    const state = fromViewMode.viewModeReducer(undefined, action);

    expect(state.mode).to.be.eql(fromViewMode.ViewMode.TILES);
  });

  it('can handle order direction', () => {
    const action = new fromViewMode.SetSortOrderDirection(
      fromViewMode.OrderDirection.DESC
    );
    const state = fromViewMode.viewModeReducer(undefined, action);

    expect(state.order.direction).to.be.eql(fromViewMode.OrderDirection.DESC);
  });

  it('can handle order field', () => {
    const action = new fromViewMode.SetSortOrderField('name');
    const state = fromViewMode.viewModeReducer(undefined, action);

    expect(state.order.field).to.be.eql('name');
  });
});
