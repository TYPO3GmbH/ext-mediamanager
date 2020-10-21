import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';
import { Action } from 'redux';

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
  action: Actions
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

export type Actions = AddSelectionItem | RemoveSelectionItem | ClearSelection;

export const itemIsSelected = createSelector(
  (state: SelectionState) => state.currentItemIds,
  currentItemIds => memoize((itemId: string) => currentItemIds.includes(itemId))
);
