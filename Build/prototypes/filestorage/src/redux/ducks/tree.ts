import { Action } from 'redux';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { createSelector } from 'reselect';

export const LOAD_TREE_DATA = '[TREE] LOAD DATA';
export const LOAD_TREE_DATA_SUCCESS = '[TREE] LOAD DATA SUCCESS';
export const LOAD_TREE_DATA_FAILURE = '[TREE] LOAD DATA FAILURE';
export const SELECT_TREE_NODE = '[TREE] SELECT NODE';

export const EXPAND_TREE_NODE = '[TREE] EXPAND NODE';
export const COLLAPSE_TREE_NODE = '[TREE] COLLAPSE NODE';

export type TreeState = Readonly<{
  url: string;
  nodes: Typo3Node[];
  loading: boolean;
  error: string | null;
  selected: Typo3Node | null;
  expandedNodeIds: string[];
}>;

const initialState: TreeState = {
  url: '',
  loading: false,
  error: null,
  nodes: [],
  selected: null,
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
        url: action.url,
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
        selected: action.node,
      };
    case EXPAND_TREE_NODE:
      return {
        ...state,
        expandedNodeIds: [...state.expandedNodeIds, action.node.identifier],
      };
    case COLLAPSE_TREE_NODE:
      return {
        ...state,
        expandedNodeIds: state.expandedNodeIds.filter(
          nodeId => nodeId != action.node.identifier
        ),
      };
    default:
      return state;
  }
};

export class LoadTreeData implements Action {
  readonly type = LOAD_TREE_DATA;
  constructor(public url: string, public init = true) {}
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
  constructor(public node: Typo3Node) {}
}

export class ExpandTreeNode implements Action {
  readonly type = EXPAND_TREE_NODE;
  constructor(public node: Typo3Node) {}
}

export class CollapseTreeNode implements Action {
  readonly type = COLLAPSE_TREE_NODE;
  constructor(public node: Typo3Node) {}
}

export type Actions =
  | LoadTreeData
  | LoadTreeDataSuccess
  | LoadTreeDataFailure
  | SelectTreeNode
  | ExpandTreeNode
  | CollapseTreeNode;

export const selectedTreeNodes = createSelector(
  (state: TreeState) => state,
  state => {
    if (state.nodes.length === 0) {
      return [];
    }

    if (null === state.selected) {
      return [state.nodes[0]];
    }

    return [
      state.selected,
      ...state.selected.parentsStateIdentifier.map(parentStateIdentifier =>
        state.nodes.find(node => {
          return node.stateIdentifier == parentStateIdentifier;
        })
      ),
    ].reverse();
  }
);
