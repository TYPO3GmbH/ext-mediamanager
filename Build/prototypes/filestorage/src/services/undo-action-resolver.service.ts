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

import { AjaxResponse } from 'rxjs/ajax';
import { isString } from 'lodash-es';
import { extractStorageFromIdentifier } from '../lib/utils';
import { RootState } from '../redux/ducks/reducers';
import { Node } from '../../../../types/node';
import { FileActions } from '../redux/ducks/actions';
import {
  getListItemByIdentifier,
  getTreeNodeByIdentifier,
} from '../redux/ducks/selectors';

interface FileResponseItem {
  id: string;
  identifier: string;
}

type FilesOrFoldersResponse = string[] | FileResponseItem[];

interface RenameResponse {
  rename: FilesOrFoldersResponse;
}

interface MoveResponse {
  move: FilesOrFoldersResponse;
}

interface CopyResponse {
  copy: FilesOrFoldersResponse;
}

interface NewFolderResponse {
  newfolder: string[];
}

interface UploadFilesResponse {
  upload: FileResponseItem[];
}

export class UndoActionResolverService {
  getUndoAction(
    action: FileActions.Actions,
    ajaxResponse: AjaxResponse,
    state: RootState
  ): FileActions.UndoFilesAction | undefined {
    switch (action.type) {
      case FileActions.RENAME_FILE:
        return this.getUndoRenameAction(action, ajaxResponse.response, state);
      case FileActions.MOVE_FILES:
        return this.getUndoMoveAction(action, ajaxResponse.response, state);
      case FileActions.COPY_FILES:
        return this.getUndoCopyAction(action, ajaxResponse.response);
      case FileActions.ADD_FOLDER:
        return this.getUndoAddFolderAction(action, ajaxResponse.response);
    }
  }

  private getUndoRenameAction(
    action: FileActions.RenameFile,
    renameResponse: RenameResponse,
    state: RootState
  ): FileActions.UndoFilesAction | undefined {
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

    return new FileActions.UndoFilesAction(data);
  }

  private getUndoMoveAction(
    action: FileActions.MoveFiles,
    moveResponse: MoveResponse,
    state: RootState
  ): FileActions.UndoFilesAction {
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
        : moveItemResponse.identifier;

      const newIdentifier =
        extractStorageFromIdentifier(identifier) + newIdentifierWithoutStorage;

      data['data[move][' + index + '][data]'] = newIdentifier;
      data[
        'data[move][' + index + '][target]'
      ] = oldItem.parentIdentifier as string;
    });

    return new FileActions.UndoFilesAction(data);
  }

  private getUndoCopyAction(
    action: FileActions.CopyFiles,
    copyResponse: CopyResponse
  ): FileActions.UndoFilesAction {
    const data: { [key: string]: string } = {};

    copyResponse.copy.forEach(
      (copyItemResponse: string | FileResponseItem, index: number) => {
        if (!Object.prototype.hasOwnProperty.call(action.identifiers, index)) {
          return;
        }
        const identifier = action.identifiers[index];

        const newIdentifierWithoutStorage = isString(copyItemResponse)
          ? copyItemResponse
          : copyItemResponse.identifier;

        const newIdentifier =
          extractStorageFromIdentifier(identifier) +
          newIdentifierWithoutStorage;

        data['data[delete][' + index + '][data]'] = newIdentifier;
      }
    );

    return new FileActions.UndoFilesAction(data);
  }

  private getUndoAddFolderAction(
    action: FileActions.AddFolder,
    newFolderResponse: NewFolderResponse
  ): FileActions.UndoFilesAction {
    const data: { [key: string]: string } = {};

    newFolderResponse.newfolder.forEach(
      (newFolderIdentifier: string, index: number) => {
        const parentIdentifier = action.parentNode.identifier;
        const newIdentifier =
          extractStorageFromIdentifier(parentIdentifier) + newFolderIdentifier;

        data['data[delete][' + index + '][data]'] = newIdentifier;
      }
    );

    return new FileActions.UndoFilesAction(data);
  }

  private getItemFromStore(
    state: RootState,
    identifier: string
  ): Node | ListItem | null {
    return (
      getTreeNodeByIdentifier(state)(identifier) ||
      getListItemByIdentifier(state)(identifier)
    );
  }
}
