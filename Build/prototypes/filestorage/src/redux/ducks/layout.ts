export const SET_SIDEBAR_WIDTH = '[LAYOUT] SET SIDEBAR WIDTH';

export type LayoutState = Readonly<{
  sidebarWidth: number;
}>;

const initialState: LayoutState = {
  sidebarWidth: 25,
};

export const layoutReducer = (
  state = initialState,
  action: { type: string; sidebarWidth: number }
): LayoutState => {
  switch (action.type) {
    case SET_SIDEBAR_WIDTH:
      return { ...state, sidebarWidth: action.sidebarWidth };
    default:
      return state;
  }
};

export const setSidebarWidth = (sidebarWidth: number) => {
  return {
    type: SET_SIDEBAR_WIDTH,
    sidebarWidth,
  };
};
