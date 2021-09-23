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

import { Node } from '../../../../../../../types/node';
import {
  Actions,
  COLLAPSE_TREE_NODE,
  EXPAND_TREE_NODE,
  LOAD_TREE_DATA,
  LOAD_TREE_DATA_FAILURE,
  LOAD_TREE_DATA_SUCCESS,
  SELECT_TREE_NODE,
} from '../../actions/tree';

export type TreeState = Readonly<{
  nodes: Node[];
  loading: boolean;
  error: string | null;
  selectedNodeId: string | null;
  expandedNodeIds: string[];
}>;

const initialState: TreeState = {
  loading: false,
  error: null,
  nodes: [],
  selectedNodeId: null,
  expandedNodeIds: [],
};

export const treeReducer = (
  state = initialState,
  action: Actions
): TreeState => {
  switch (action.type) {
    case LOAD_TREE_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TREE_DATA_SUCCESS:
      return {
        ...state,
        nodes: action.data,
        loading: false,
      };
    case LOAD_TREE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SELECT_TREE_NODE:
      return {
        ...state,
        selectedNodeId: action.identifier,
      };
    case EXPAND_TREE_NODE:
      return {
        ...state,
        expandedNodeIds: [...state.expandedNodeIds, action.identifier],
      };
    case COLLAPSE_TREE_NODE:
      return {
        ...state,
        expandedNodeIds: state.expandedNodeIds.filter(
          nodeId => nodeId != action.identifier
        ),
      };
    default:
      return state;
  }
};
