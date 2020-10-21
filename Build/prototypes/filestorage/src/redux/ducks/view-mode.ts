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
  action: {
    type: string;
    viewMode: ViewMode;
    field: string;
    direction: OrderDirection;
  }
): ViewModeState => {
  switch (action.type) {
    case SET_VIEW_MODE:
      return { ...state, mode: action.viewMode };
    case SET_SORT_ORDER_FIELD:
      return {
        ...state,
        order: { ...state.order, field: action.field },
      };
    case SET_SORT_ORDER_DIRECTION:
      return {
        ...state,
        order: { ...state.order, direction: action.direction },
      };
    default:
      return state;
  }
};

export const setViewMode = (viewMode: ViewMode) => {
  return {
    type: SET_VIEW_MODE,
    viewMode,
  };
};

export const setSortOrderField = (field: string) => {
  return {
    type: SET_SORT_ORDER_FIELD,
    field,
  };
};

export const setSortOrderDirection = (direction: string) => {
  return {
    type: SET_SORT_ORDER_DIRECTION,
    direction,
  };
};
