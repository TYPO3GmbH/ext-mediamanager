import { Action } from 'redux';
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

export const ADD_SELECTION_ITEM = '[LIST] ADD ITEM TO SELECTION';
export const REMOVE_SELECTION_ITEM = '[LIST] REMOVE ITEM FROM SELECTION';
export const CLEAR_SELECTION = '[LIST] CLEAR SELECTION';
export const SET_SELECTION = '[LLIST] SET SELECTION';

export const LOAD_LIST_DATA = '[LIST] LOAD DATA';
export const LOAD_LIST_DATA_SUCCESS = '[LIST] LOAD DATA SUCCESS';
export const LOAD_LIST_DATA_FAILURE = '[LIST] LOAD DATA FAILURE';

export type ListState = Readonly<{
  items: ListItem[];
  selectedItemIds: string[];
  loading: boolean;
  error: string | null;
}>;

const initialState: ListState = {
  items: [],
  selectedItemIds: [],
  loading: false,
  error: null,
};

export const listReducer = (
  state = initialState,
  action: Actions
): ListState => {
  switch (action.type) {
    case LOAD_LIST_DATA:
      return {
        ...state,
        loading: true,
        items: [],
      };
    case LOAD_LIST_DATA_SUCCESS:
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    case LOAD_LIST_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_SELECTION_ITEM:
      return {
        ...state,
        selectedItemIds: [...state.selectedItemIds, action.id],
      };
    case REMOVE_SELECTION_ITEM:
      return {
        ...state,
        selectedItemIds: state.selectedItemIds.filter(
          item => item !== action.id
        ),
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        selectedItemIds: [],
      };
    case SET_SELECTION:
      return {
        ...state,
        selectedItemIds: action.ids.slice(),
      };
    default:
      return state;
  }
};

export class AddSelectionItem implements Action {
  readonly type = ADD_SELECTION_ITEM;
  constructor(public id: string) {}
}

export class RemoveSelectionItem implements Action {
  readonly type = REMOVE_SELECTION_ITEM;
  constructor(public id: string) {}
}

export class ClearSelection implements Action {
  readonly type = CLEAR_SELECTION;
}

export class SetSelection implements Action {
  readonly type = SET_SELECTION;
  constructor(public ids: string[]) {}
}

export class LoadListData implements Action {
  readonly type = LOAD_LIST_DATA;
  constructor(public url: string) {}
}

export class LoadListDataSuccess implements Action {
  readonly type = LOAD_LIST_DATA_SUCCESS;
  constructor(public data: ListItem[]) {}
}

export class LoadListDataFailure implements Action {
  readonly type = LOAD_LIST_DATA_FAILURE;
  constructor(public error: string) {}
}

export const itemIsSelected = createSelector(
  (state: ListState) => state.selectedItemIds,
  currentItemIds => memoize((itemId: string) => currentItemIds.includes(itemId))
);

export const selectionIsEmpty = createSelector(
  (state: ListState) => state.selectedItemIds,
  currentItemIds => currentItemIds.length === 0
);

export const selectedRows = createSelector(
  (state: ListState) => state,
  state =>
    state.items.filter(item => state.selectedItemIds.includes(item.identifier))
);

export type Actions =
  | AddSelectionItem
  | RemoveSelectionItem
  | ClearSelection
  | SetSelection
  | LoadListData
  | LoadListDataSuccess
  | LoadListDataFailure;
