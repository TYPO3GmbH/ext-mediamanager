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

import { ActionsObservable, StateObservable } from 'redux-observable';
import * as fromActions from '../ducks/global-actions';
import { mergeMap, switchMap } from 'rxjs/operators';
import * as fromTree from '../ducks/tree';
import * as fromList from '../ducks/list';
import { RootState } from '../ducks';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { FlashMessagesService } from '../../services/flash-messages.service';

export const reload = (
  action$: ActionsObservable<fromActions.Reload>
): Observable<Action> => {
  return action$
    .ofType(fromActions.RELOAD)
    .pipe(
      mergeMap(() => [
        new fromTree.LoadTreeData(false),
        new fromList.ReloadListData(),
      ])
    );
};

export const loadFlashMessages = (
  action$: ActionsObservable<fromActions.LoadFlashMessages>,
  state$: StateObservable<RootState>,
  dependencies: { flashMessagesService: FlashMessagesService }
): Observable<unknown> => {
  return action$
    .ofType(fromActions.LOAD_FLASH_MESSAGES)
    .pipe(
      switchMap(action =>
        dependencies.flashMessagesService.fetchFlashMessages(action)
      )
    );
};
