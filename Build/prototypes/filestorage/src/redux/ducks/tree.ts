import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { createSelector } from 'reselect';

const LOAD_TREE_DATA = '[TREE] LOAD DATA';
const LOAD_TREE_DATA_SUCCESS = '[TREE] LOAD DATA SUCCESS';
const LOAD_TREE_DATA_FAILURE = '[TREE] LOAD DATA FAILURE';
const SELECT_TREE_NODE = '[TREE] SELECT NODE';

const EXPAND_TREE_NODE = '[TREE] EXPAND NODE';
const COLLAPSE_TREE_NODE = '[TREE] COLLAPSE NODE';

export type TreeState = Readonly<{
  nodes: Typo3Node[];
  loading: boolean;
  error: string | null;
  selected: Typo3Node | null;
  expandedNodeIds: string[];
}>;

const initialState: TreeState = {
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

export const fetchTree = (treeUrl: string) => {
  return (dispatch: ThunkDispatch<Actions, any, any>) => {
    dispatch(new LoadTreeData());
    fetch(treeUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(data => {
        dispatch(new LoadTreeDataSuccess(data));
      })
      .catch((error: Error) => {
        dispatch(new LoadTreeDataFailure(error.message));
      });
  };
};

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
