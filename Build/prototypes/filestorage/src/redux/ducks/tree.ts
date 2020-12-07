import { Action } from 'redux';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { createSelector } from 'reselect';
import { RootState } from './index';
import { resolveNodePath } from '../../lib/utils';
import { memoize } from 'lodash-es';

export const LOAD_TREE_DATA = '[TREE] LOAD DATA';
export const LOAD_TREE_DATA_SUCCESS = '[TREE] LOAD DATA SUCCESS';
export const LOAD_TREE_DATA_FAILURE = '[TREE] LOAD DATA FAILURE';
export const SELECT_TREE_NODE = '[TREE] SELECT NODE';

export const EXPAND_TREE_NODE = '[TREE] EXPAND NODE';
export const COLLAPSE_TREE_NODE = '[TREE] COLLAPSE NODE';

export type TreeState = Readonly<{
  nodes: Typo3Node[];
  loading: boolean;
  error: string | null;
  selectedNodeId: string | null;
  expandedNodeIds: string[];
}>;

const initialState: TreeState = {
  loading: false,
  error: null,
  nodes: [],
  selectedNodeId: null,
  expandedNodeIds: [],
};

export const treeReducer = (
  state = initialState,
  action: Actions
): TreeState => {
  switch (action.type) {
    case LOAD_TREE_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TREE_DATA_SUCCESS:
      return {
        ...state,
        nodes: action.data,
        loading: false,
      };
    case LOAD_TREE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SELECT_TREE_NODE:
      return {
        ...state,
        selectedNodeId: action.identifier,
      };
    case EXPAND_TREE_NODE:
      return {
        ...state,
        expandedNodeIds: [...state.expandedNodeIds, action.identifier],
      };
    case COLLAPSE_TREE_NODE:
      return {
        ...state,
        expandedNodeIds: state.expandedNodeIds.filter(
          nodeId => nodeId != action.identifier
        ),
      };
    default:
      return state;
  }
};

export class LoadTreeData implements Action {
  readonly type = LOAD_TREE_DATA;
  constructor(public init = true) {}
}

export class LoadTreeDataSuccess implements Action {
  readonly type = LOAD_TREE_DATA_SUCCESS;
  constructor(public data: Typo3Node[]) {}
}

export class LoadTreeDataFailure implements Action {
  readonly type = LOAD_TREE_DATA_FAILURE;
  constructor(public error: string) {}
}

export class SelectTreeNode implements Action {
  readonly type = SELECT_TREE_NODE;
  constructor(public identifier: string) {}
}

export class ExpandTreeNode implements Action {
  readonly type = EXPAND_TREE_NODE;
  constructor(public identifier: string) {}
}

export class CollapseTreeNode implements Action {
  readonly type = COLLAPSE_TREE_NODE;
  constructor(public identifier: string) {}
}

export type Actions =
  | LoadTreeData
  | LoadTreeDataSuccess
  | LoadTreeDataFailure
  | SelectTreeNode
  | ExpandTreeNode
  | CollapseTreeNode;

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
