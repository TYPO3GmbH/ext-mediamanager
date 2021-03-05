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

export const CLEAR_SELECTION = '[LIST] CLEAR SELECTION';
export const SET_SELECTION = '[LIST] SET SELECTION';
export const LOAD_LIST_DATA = '[LIST] LOAD DATA';
export const RELOAD_LIST_DATA = '[LIST] RELOAD DATA';
export const LOAD_LIST_DATA_SUCCESS = '[LIST] LOAD DATA SUCCESS';
export const LOAD_LIST_DATA_FAILURE = '[LIST] LOAD DATA FAILURE';
export const SEARCH_TERM_CHANGED = '[LIST] SEARCH TERM CHANGED';
export const SEARCH_FILES = '[LIST] SEARCH FILES';
export const SEARCH_FILES_SUCCESS = '[LIST] SEARCH FILES SUCCESS';
export const SEARCH_FILES_FAILURE = '[LIST] SEARCH FILES FAILURE';

export class ClearSelection implements Action {
  readonly type = CLEAR_SELECTION;
}

export class SetSelection implements Action {
  readonly type = SET_SELECTION;

  constructor(public ids: string[]) {}
}

export class LoadListData implements Action {
  readonly type = LOAD_LIST_DATA;

  constructor(public url: string) {}
}

export class LoadListDataSuccess implements Action {
  readonly type = LOAD_LIST_DATA_SUCCESS;

  constructor(public data: ListItem[]) {}
}

export class LoadListDataFailure implements Action {
  readonly type = LOAD_LIST_DATA_FAILURE;

  constructor(public error: string) {}
}

export class ReloadListData implements Action {
  readonly type = RELOAD_LIST_DATA;
}

export class SearchTermChanged implements Action {
  readonly type = SEARCH_TERM_CHANGED;

  constructor(public searchTerm: string) {}
}

export class SearchFiles implements Action {
  readonly type = SEARCH_FILES;

  constructor(public searchTerm: string) {}
}

export class SearchFilesSuccess implements Action {
  readonly type = SEARCH_FILES_SUCCESS;

  constructor(public data: ListItem[]) {}
}

export class SearchFilesFailure implements Action {
  readonly type = SEARCH_FILES_FAILURE;

  constructor(public error: string) {}
}

export type Actions =
  | ClearSelection
  | SetSelection
  | LoadListData
  | LoadListDataSuccess
  | LoadListDataFailure
  | ReloadListData
  | SearchFiles
  | SearchTermChanged
  | SearchFilesSuccess
  | SearchFilesFailure;
