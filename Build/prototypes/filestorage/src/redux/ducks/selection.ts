import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

export const ADD_SELECTION_ITEM = '[SELECTION] ADD ITEM';
export const REMOVE_SELECTION_ITEM = '[SELECTION] REMOVE ITEM';
export const CLEAR_SELECTION = '[SELECTION] CLEAR';

export type SelectionState = Readonly<{
  currentItemIds: string[];
}>;

const initialState: SelectionState = {
  currentItemIds: [],
};

export const selectionReducer = (
  state = initialState,
  action: { type: string; id: string }
): SelectionState => {
  switch (action.type) {
    case ADD_SELECTION_ITEM:
      return {
        ...state,
        currentItemIds: [...state.currentItemIds, action.id],
      };
    case REMOVE_SELECTION_ITEM:
      return {
        ...state,
        currentItemIds: state.currentItemIds.filter(item => item !== action.id),
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        currentItemIds: [],
      };
    default:
      return state;
  }
};

export const addSelectionItem = (id: string) => {
  return {
    type: ADD_SELECTION_ITEM,
    id: id,
  };
};

export const removeSelectionItem = (id: string) => {
  return {
    type: REMOVE_SELECTION_ITEM,
    id: id,
  };
};

export const clearSelection = () => {
  return {
    type: CLEAR_SELECTION,
  };
};

export const itemIsSelected = createSelector(
  (state: SelectionState) => state.currentItemIds,
  currentItemIds => memoize((itemId: string) => currentItemIds.includes(itemId))
);
