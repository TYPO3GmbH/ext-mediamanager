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

import { Action } from 'redux';
import { Node } from '../../../../../../../types/node';

export const LOAD_TREE_DATA = '[TREE] LOAD DATA';
export const LOAD_TREE_DATA_SUCCESS = '[TREE] LOAD DATA SUCCESS';
export const LOAD_TREE_DATA_FAILURE = '[TREE] LOAD DATA FAILURE';
export const SELECT_TREE_NODE = '[TREE] SELECT NODE';
export const EXPAND_TREE_NODE = '[TREE] EXPAND NODE';
export const COLLAPSE_TREE_NODE = '[TREE] COLLAPSE NODE';

export class LoadTreeData implements Action {
  readonly type = LOAD_TREE_DATA;

  constructor(public init = true) {}
}

export class LoadTreeDataSuccess implements Action {
  readonly type = LOAD_TREE_DATA_SUCCESS;

  constructor(public data: Node[]) {}
}

export class LoadTreeDataFailure implements Action {
  readonly type = LOAD_TREE_DATA_FAILURE;

  constructor(public error: string) {}
}

export class SelectTreeNode implements Action {
  readonly type = SELECT_TREE_NODE;

  constructor(public identifier: string) {}
}

export class ExpandTreeNode implements Action {
  readonly type = EXPAND_TREE_NODE;

  constructor(public identifier: string) {}
}

export class CollapseTreeNode implements Action {
  readonly type = COLLAPSE_TREE_NODE;

  constructor(public identifier: string) {}
}

export type Actions =
  | LoadTreeData
  | LoadTreeDataSuccess
  | LoadTreeDataFailure
  | SelectTreeNode
  | ExpandTreeNode
  | CollapseTreeNode;
