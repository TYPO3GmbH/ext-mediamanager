import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { createSelector } from 'reselect';

const LOAD_TREE_DATA = '[TREE] LOAD DATA';
const LOAD_TREE_DATA_SUCCESS = '[TREE] LOAD DATA SUCCESS';
const LOAD_TREE_DATA_FAILURE = '[TREE] LOAD DATA FAILURE';
const SELECT_TREE_NODE = '[TREE] SELECT NODE';

export type TreeState = Readonly<{
  nodes: Typo3Node[];
  loading: boolean;
  error: string | null;
  selected: Typo3Node | null;
}>;

const initialState: TreeState = {
  loading: false,
  error: null,
  nodes: [],
  selected: null,
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
    default:
      return state;
  }
};

export class LoadTreeData implements Action {
  readonly type = LOAD_TREE_DATA;
}

export class LoadTreeDataSuccess implements Action {
  readonly type = LOAD_TREE_DATA_SUCCESS;
  constructor(public data: object[]) {}
}

export class LoadTreeDataFailure implements Action {
  readonly type = LOAD_TREE_DATA_FAILURE;
  constructor(public error: string) {}
}

export class SelectTreeNode implements Action {
  readonly type = SELECT_TREE_NODE;
  constructor(public node: Typo3Node) {}
}

export type Actions =
  | LoadTreeData
  | LoadTreeDataSuccess
  | LoadTreeDataFailure
  | SelectTreeNode;

export const fetchTree = () => {
  const url = window.typo3BackendUrl + '/filestorage/tree';

  return (dispatch: ThunkDispatch<Actions, any, any>) => {
    dispatch(new LoadTreeData());
    fetch(url)
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
      ...state.selected.parents.map(parentIdentifier =>
        state.nodes.find(node => {
          return node.identifier == parentIdentifier;
        })
      ),
    ].reverse();
  }
);
