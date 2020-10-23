import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const LOAD_TREE_DATA = '[TREE] LOAD DATA';
const LOAD_TREE_DATA_SUCCESS = '[TREE] LOAD DATA SUCCESS';
const LOAD_TREE_DATA_FAILURE = '[TREE] LOAD DATA FAILURE';

const dummyData = [
  {
    stateIdentifier: '0_0',
    identifier: 0,
    depth: 0,
    tip: 'id=0',
    icon: 'apps-pagetree-page-shortcut-root',
    name: 'New TYPO3 site',
    nameSourceField: 'title',
    mountPoint: 0,
    workspaceId: 0,
    siblingsCount: 1,
    siblingsPosition: 1,
    allowDelete: true,
    allowEdit: true,
    hasChildren: true,
    isMountPoint: true,
    loaded: true,
  },
  {
    stateIdentifier: '0_1',
    identifier: 1,
    depth: 1,
    tip: 'id=1 - Hidden',
    icon: 'apps-pagetree-folder-default',
    name: 'Dummy Page',
    nameSourceField: 'title',
    mountPoint: 0,
    workspaceId: 1,
    siblingsCount: 1,
    siblingsPosition: 1,
    allowDelete: true,
    allowEdit: true,
    overlayIcon: 'overlay-hidden',
  },
];

export type TreeState = Readonly<{
  nodes: object[];
  loading: boolean;
  error: string | null;
}>;

const initialState: TreeState = {
  loading: false,
  error: null,
  nodes: [],
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

export type Actions = LoadTreeData | LoadTreeDataSuccess | LoadTreeDataFailure;

export const fetchTree = () => {
  const url =
    'https://7cb51cd8-619b-460e-bea8-e4b2a771548c.mock.pstmn.io/filestorage/tree';

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
