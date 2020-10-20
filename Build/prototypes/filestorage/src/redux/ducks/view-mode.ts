export enum ViewMode {
  LIST,
  TILES,
}

export const SET_VIEW_MODE = 'SET_VIEW_MODE';

export type ViewModeState = Readonly<{
  viewMode: ViewMode;
}>;

const initialState: ViewModeState = {
  viewMode: ViewMode.LIST,
};

export const viewModeReducer = (
  state = initialState,
  action: { type: string; viewMode: ViewMode }
): ViewModeState => {
  switch (action.type) {
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.viewMode };
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
