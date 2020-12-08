import * as fromFileActions from '../redux/ducks/file-actions';
import { AjaxResponse } from 'rxjs/ajax';
import { isString } from 'lodash-es';
import { extractStorageFromIdentifier } from '../lib/utils';
import { RootState } from '../redux/ducks';
import * as fromTree from '../redux/ducks/tree';
import * as fromList from '../redux/ducks/list';

interface RenameResponse {
  rename: string[] | { identifier: string }[];
}

export class UndoActionResolverService {
  getUndoAction(
    action: fromFileActions.Actions,
    ajaxResponse: AjaxResponse,
    state: RootState
  ): fromFileActions.UndoFilesAction | undefined {
    switch (action.type) {
      case fromFileActions.RENAME_FILE:
        return this.getUndoRenameAction(action, ajaxResponse.response, state);
    }
  }

  private getUndoRenameAction(
    action: fromFileActions.RenameFile,
    renameResponse: RenameResponse,
    state: RootState
  ): fromFileActions.UndoFilesAction | undefined {
    const oldItem =
      fromTree.getTreeNodeByIdentifier(state)(action.identifier) ||
      fromList.getListItemByIdentifier(state)(action.identifier);
    if (null === oldItem) {
      return;
    }

    const newIdentifierWithoutStorage = isString(renameResponse.rename[0])
      ? renameResponse.rename[0]
      : renameResponse.rename[0].identifier;

    const newIdentifier =
      extractStorageFromIdentifier(action.identifier) +
      newIdentifierWithoutStorage;

    const data = {
      'data[rename][0][data]': newIdentifier,
      'data[rename][0][target]': oldItem.name,
    };

    return new fromFileActions.UndoFilesAction(data);
  }
}
