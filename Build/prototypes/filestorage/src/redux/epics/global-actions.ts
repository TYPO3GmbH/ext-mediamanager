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
import { mergeMap, switchMap } from 'rxjs/operators';
import { RootState } from '../ducks/reducers';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { FlashMessagesService } from '../../services/flash-messages.service';
import { ReloadListData } from '../ducks/actions/list';
import { LoadTreeData } from '../ducks/actions/tree';
import { GlobalActions } from '../ducks/actions';

export const reload = (
  action$: ActionsObservable<GlobalActions.Reload>
): Observable<Action> => {
  return action$
    .ofType(GlobalActions.RELOAD)
    .pipe(mergeMap(() => [new LoadTreeData(false), new ReloadListData()]));
};

export const loadFlashMessages = (
  action$: ActionsObservable<GlobalActions.LoadFlashMessages>,
  state$: StateObservable<RootState>,
  dependencies: { flashMessagesService: FlashMessagesService }
): Observable<unknown> => {
  return action$
    .ofType(GlobalActions.LOAD_FLASH_MESSAGES)
    .pipe(
      switchMap(action =>
        dependencies.flashMessagesService.fetchFlashMessages(action)
      )
    );
};
