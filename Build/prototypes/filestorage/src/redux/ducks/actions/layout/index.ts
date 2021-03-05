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

export const SET_SIDEBAR_WIDTH = '[LAYOUT] SET SIDEBAR WIDTH';
export const TOGGLE_SIDEBAR = '[LAYOUT] TOGGLE SIDEBAR';

export class SetSidebarWidth implements Action {
  readonly type = SET_SIDEBAR_WIDTH;

  constructor(public sidebarWidth: number) {}
}

export class ToggleSidebar implements Action {
  readonly type = TOGGLE_SIDEBAR;
}

export type Actions = SetSidebarWidth | ToggleSidebar;
