import { Action } from 'redux';
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';
import { RootState } from './index';

export const CLEAR_SELECTION = '[LIST] CLEAR SELECTION';
export const SET_SELECTION = '[LLIST] SET SELECTION';

export const LOAD_LIST_DATA = '[LIST] LOAD DATA';
export const LOAD_LIST_DATA_SUCCESS = '[LIST] LOAD DATA SUCCESS';
export const LOAD_LIST_DATA_FAILURE = '[LIST] LOAD DATA FAILURE';

export const SEARCH_FILES = '[LIST] SEARCH FILES';
export const SEARCH_FILES_SUCCESS = '[LIST] SEARCH FILES SUCCESS';
export const SEARCH_FILES_FAILURE = '[LIST] SEARCH FILES FAILURE';

export type ListState = Readonly<{
  items: ListItem[];
  selectedItemIds: string[];
  loading: boolean;
  error: string | null;
  searchTerm: string | null;
}>;

const initialState: ListState = {
  items: [],
  selectedItemIds: [],
  loading: false,
  error: null,
  searchTerm: null,
};

export const listReducer = (
  state = initialState,
  action: Actions
): ListState => {
  switch (action.type) {
    case LOAD_LIST_DATA:
      return {
        ...state,
        searchTerm: null,
        loading: true,
        items: [],
      };
    case SEARCH_FILES:
      return {
        ...state,
        searchTerm: action.searchTermn,
        loading: true,
        items: [],
      };
    case LOAD_LIST_DATA_SUCCESS:
    case SEARCH_FILES_SUCCESS:
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    case LOAD_LIST_DATA_FAILURE:
    case SEARCH_FILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
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

export class SearchFiles implements Action {
  readonly type = SEARCH_FILES;
  constructor(public searchTermn: string) {}
}

export class SearchFilesSuccess implements Action {
  readonly type = SEARCH_FILES_SUCCESS;
  constructor(public data: ListItem[]) {}
}

export class SearchFilesFailure implements Action {
  readonly type = SEARCH_FILES_FAILURE;
  constructor(public error: string) {}
}

const listSelector = (state: RootState) => state.list;

export const isItemSelected = createSelector(listSelector, list =>
  memoize((itemId: string) => list.selectedItemIds.includes(itemId))
);

export const isEmptySelection = createSelector(
  listSelector,
  list => list.selectedItemIds.length === 0
);

export const getSelectedItems = createSelector(listSelector, list =>
  list.items.filter(item => list.selectedItemIds.includes(item.identifier))
);

export const getItems = createSelector(listSelector, list => list.items);

export const getListItemByIdentifier = createSelector(getItems, items =>
  memoize(
    (identifier: string) =>
      items.find(item => identifier === item.identifier) ?? null
  )
);

export type Actions =
  | ClearSelection
  | SetSelection
  | LoadListData
  | LoadListDataSuccess
  | LoadListDataFailure
  | SearchFiles
  | SearchFilesSuccess
  | SearchFilesFailure;
