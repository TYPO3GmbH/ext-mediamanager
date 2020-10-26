import { Action } from 'redux';

export const SET_SIDEBAR_WIDTH = '[LAYOUT] SET SIDEBAR WIDTH';

export type LayoutState = Readonly<{
  sidebarWidth: number;
}>;

const initialState: LayoutState = {
  sidebarWidth: 25,
};

export const layoutReducer = (
  state = initialState,
  action: Actions
): LayoutState => {
  switch (action.type) {
    case SET_SIDEBAR_WIDTH:
      return { ...state, sidebarWidth: action.sidebarWidth };
    default:
      return state;
  }
};

export class SetSidebarWidth implements Action {
  readonly type = SET_SIDEBAR_WIDTH;
  constructor(public sidebarWidth: number) {}
}

export type Actions = SetSidebarWidth;
