/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import {
  Actions,
  CLEAR_SELECTION,
  LOAD_LIST_DATA,
  LOAD_LIST_DATA_FAILURE,
  LOAD_LIST_DATA_SUCCESS,
  SEARCH_FILES,
  SEARCH_FILES_FAILURE,
  SEARCH_FILES_SUCCESS,
  SET_SELECTION,
} from '../../actions/list';

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
        searchTerm: action.searchTerm,
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
