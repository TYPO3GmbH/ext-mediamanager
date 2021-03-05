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

import { createSelector } from 'reselect';
import { resolveNodePath } from '../../../../lib/utils';
import { memoize } from 'lodash-es';
import { RootState } from '../../reducers';

const treeSelector = (state: RootState) => state.tree;

export const getTreeNodes = createSelector(treeSelector, tree => tree.nodes);

export const getTreeNodeByIdentifier = createSelector(getTreeNodes, nodes =>
  memoize(
    (identifier: string) =>
      nodes.find(node => identifier === node.identifier) ?? null
  )
);

export const getSelectedTreeNode = createSelector(
  treeSelector,
  tree =>
    tree.nodes.find(node => node.identifier === tree.selectedNodeId) ?? null
);

export const getLastSelectedTreeNodeId = createSelector(
  treeSelector,
  tree => tree.selectedNodeId
);

export const getExpandedTreeNodeIds = createSelector(
  treeSelector,
  tree => tree.expandedNodeIds
);

export const getSelectedTreeNodePath = createSelector(
  getTreeNodes,
  getSelectedTreeNode,
  (nodes, selectedNode) => resolveNodePath(nodes, selectedNode)
);

export const selectedTreeNodeIdentifiers = createSelector(
  treeSelector,
  state => {
    if (null === state.selectedNodeId) {
      return [];
    }

    return [state.selectedNodeId];
  }
);
