import { ViewMode } from '../reducer';

export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const SET_SIDEBAR_WIDTH = 'SET_SIDEBAR_WIDTH';

export const setViewMode = (viewMode: ViewMode) => {
  return {
    type: SET_VIEW_MODE,
    viewMode,
  };
};

export const setSidebarWidth = (width: number) => {
  return {
    type: SET_SIDEBAR_WIDTH,
    width,
  };
};
