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
import * as fromTree from '../../../src/redux/ducks/actions/tree';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { treeReducer } from '../../../src/redux/ducks/reducers/tree';

describe('Tree reducer', () => {
  it('can return the initial state', () => {
    const state = treeReducer(undefined, {} as fromTree.Actions);
    const expectedState = {
      loading: false,
      error: null,
      nodes: [],
      selectedNodeId: null,
      expandedNodeIds: [],
    };

    expect(state).to.be.eql(expectedState);
  });

  it('sets tree state to loading on `LoadTreeData`', () => {
    const action = new fromTree.LoadTreeData();
    const state = treeReducer(undefined, action);

    expect(state.loading).to.be.true;
  });

  it('sets tree data on `LoadTreeDataSuccess`', () => {
    const treeNodes = [{ identifier: 'id_12' }] as Typo3Node[];
    const action = new fromTree.LoadTreeDataSuccess(treeNodes);
    const state = treeReducer(undefined, action);

    expect(state.nodes).to.be.eqls(treeNodes);
    expect(state.loading).to.be.false;
  });

  it('sets tree state to error on `LoadTreeDataFailure`', () => {
    const action = new fromTree.LoadTreeDataFailure('error');
    const state = treeReducer(undefined, action);

    expect(state.error).to.be.eqls('error');
    expect(state.loading).to.be.false;
  });

  it('sets selectedNodeId on `SelectTreeNode`', () => {
    const action = new fromTree.SelectTreeNode('id');
    const state = treeReducer(undefined, action);

    expect(state.selectedNodeId).to.be.eqls('id');
  });

  it('adds id to expandedNodeIds on `ExpandTreeNode`', () => {
    const action = new fromTree.ExpandTreeNode('id');
    const state = treeReducer(undefined, action);

    expect(state.expandedNodeIds).to.be.eqls(['id']);
  });

  it('removes id from expandedNodeIds on `CollapseTreeNode`', () => {
    const action = new fromTree.CollapseTreeNode('id-2');
    const prevState = {
      loading: false,
      error: null,
      nodes: [],
      selectedNodeId: null,
      expandedNodeIds: ['id-1', 'id-2'],
    };
    const state = treeReducer(prevState, action);

    expect(state.expandedNodeIds).to.be.eqls(['id-1']);
  });
});
