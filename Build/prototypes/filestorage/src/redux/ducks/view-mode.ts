import { Action } from 'redux';

export enum ViewMode {
  LIST,
  TILES,
}

export enum OrderDirection {
  'ASC' = 'asc',
  'DESC' = 'desc',
}

export const SET_VIEW_MODE = '[VIEW_MODE] SET MODE';
export const SET_SORT_ORDER_FIELD = '[VIEW_MODE] SET SORT ORDER FIELD';
export const SET_SORT_ORDER_DIRECTION = '[VIEW_MODE] SET SORT ORDER DIRECTION';

export type ViewModeState = Readonly<{
  mode: ViewMode;
  order: {
    field: string;
    direction: OrderDirection;
  };
}>;

const initialState: ViewModeState = {
  mode: ViewMode.LIST,
  order: {
    field: 'name',
    direction: OrderDirection.ASC,
  },
};

export const viewModeReducer = (
  state = initialState,
  action: Actions
): ViewModeState => {
  switch (action.type) {
    case SET_VIEW_MODE:
      return { ...state, mode: action.viewmode };
    case SET_SORT_ORDER_FIELD:
      return {
        ...state,
        order: { ...state.order, field: action.field },
      };
    case SET_SORT_ORDER_DIRECTION:
      return {
        ...state,
        order: {
          ...state.order,
          direction: action.direction as OrderDirection,
        },
      };
    default:
      return state;
  }
};

export class SetViewMode implements Action {
  readonly type = SET_VIEW_MODE;
  constructor(public viewmode: ViewMode) {}
}

export class SetSortOrderField implements Action {
  readonly type = SET_SORT_ORDER_FIELD;
  constructor(public field: string) {}
}

export class SetSortOrderDirection implements Action {
  readonly type = SET_SORT_ORDER_DIRECTION;
  constructor(public direction: string) {}
}

export type Actions = SetViewMode | SetSortOrderField | SetSortOrderDirection;
