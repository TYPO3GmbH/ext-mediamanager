import * as Action from './actions';

export enum ViewMode {
  LIST,
  TILES,
}

export type FileStorageState = Readonly<{
  viewMode: ViewMode;
  layout: {
    sidebarWidth: number;
  };
}>;

const initialState: FileStorageState = {
  viewMode: ViewMode.LIST,
  layout: {
    sidebarWidth: 25,
  },
};

export const reducer = (
  state = initialState,
  action: { type: string }
): FileStorageState => {
  switch (action.type) {
    case Action.SET_VIEW_MODE:
      return { ...state, viewMode: action.viewMode };
    case Action.SET_SIDEBAR_WIDTH:
      return {
        ...state,
        layout: {
          ...state.layout,
          sidebarWidth: action.width,
        },
      };
    default:
      return state;
  }
};
