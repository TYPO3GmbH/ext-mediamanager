import * as fromFileActions from '../redux/ducks/file-actions';
import { AjaxResponse } from 'rxjs/ajax';
import { isString } from 'lodash-es';
import { extractStorageFromIdentifier } from '../lib/utils';
import { RootState } from '../redux/ducks';
import * as fromTree from '../redux/ducks/tree';
import * as fromList from '../redux/ducks/list';
import { Typo3Node } from '../../../../packages/filetree/src/lib/typo3-node';

interface RenameResponse {
  rename: string[] | { identifier: string }[];
}

interface MoveResponse {
  move: string[] | { identifier: string }[];
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
      case fromFileActions.MOVE_FILES:
        return this.getUndoMoveAction(action, ajaxResponse.response, state);
    }
  }

  private getUndoRenameAction(
    action: fromFileActions.RenameFile,
    renameResponse: RenameResponse,
    state: RootState
  ): fromFileActions.UndoFilesAction | undefined {
    const oldItem = this.getItemFromStore(state, action.identifier);
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

  private getUndoMoveAction(
    action: fromFileActions.MoveFiles,
    moveResponse: MoveResponse,
    state: RootState
  ): fromFileActions.UndoFilesAction {
    const data: { [key: string]: string } = {};
    action.identifiers.forEach((identifier: string, index) => {
      const oldItem = this.getItemFromStore(state, identifier);

      if (null === oldItem) {
        return;
      }

      if (!Object.prototype.hasOwnProperty.call(moveResponse.move, index)) {
        return;
      }
      const moveItemResponse = moveResponse.move[index];

      const newIdentifierWithoutStorage = isString(moveItemResponse)
        ? moveItemResponse
        : moveItemResponse['identifier'];

      const newIdentifier =
        extractStorageFromIdentifier(identifier) + newIdentifierWithoutStorage;

      data['data[move][' + index + '][data]'] = newIdentifier;
      data[
        'data[move][' + index + '][target]'
      ] = oldItem.parentIdentifier as string;
    });

    return new fromFileActions.UndoFilesAction(data);
  }

  private getItemFromStore(
    state: RootState,
    identifier: string
  ): Typo3Node | ListItem | null {
    return (
      fromTree.getTreeNodeByIdentifier(state)(identifier) ||
      fromList.getListItemByIdentifier(state)(identifier)
    );
  }
}
