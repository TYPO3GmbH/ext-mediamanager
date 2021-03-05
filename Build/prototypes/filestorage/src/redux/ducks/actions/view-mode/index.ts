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
import { ViewModes } from '../../reducers/view-mode';

export const SET_VIEW_MODE = '[VIEW_MODE] SET MODE';
export const SET_SORT_ORDER_FIELD = '[VIEW_MODE] SET SORT ORDER FIELD';
export const SET_SORT_ORDER_DIRECTION = '[VIEW_MODE] SET SORT ORDER DIRECTION';

export class SetViewMode implements Action {
  readonly type = SET_VIEW_MODE;

  constructor(public viewmode: ViewModes) {}
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
