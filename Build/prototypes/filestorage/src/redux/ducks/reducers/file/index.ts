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

import {
  ListActions,
  TreeActions,
  ViewModeActions,
  GlobalActions,
  FileActions,
  LayoutActions,
} from '../../actions';

export type FileActionsState = Readonly<{
  isAddingFolder: boolean;
  isDeletingFiles: boolean;
  isRenamingFile: boolean;
  isReplacingFile: boolean;
  isUploadingFiles: boolean;
  isDraggingFiles: boolean;
  isMovingFiles: boolean;
  isCopyingFiles: boolean;
  isPastingFiles: boolean;
  isDownloadingFiles: boolean;
  isUndoingFileAction: boolean;
  dragFilesMode: 'copy' | 'move';
}>;

const initialState: FileActionsState = {
  isAddingFolder: false,
  isDeletingFiles: false,
  isRenamingFile: false,
  isReplacingFile: false,
  isUploadingFiles: false,
  isDraggingFiles: false,
  isMovingFiles: false,
  isCopyingFiles: false,
  isPastingFiles: false,
  isDownloadingFiles: false,
  isUndoingFileAction: false,
  dragFilesMode: 'move',
};

export const fileActionsReducer = (
  state = initialState,
  action: FileActions.Actions
): FileActionsState => {
  switch (action.type) {
    case FileActions.ADD_FOLDER:
      return {
        ...state,
        isAddingFolder: true,
      };
    case FileActions.ADD_FOLDER_SUCCESS:
    case FileActions.ADD_FOLDER_FAILURE:
      return {
        ...state,
        isAddingFolder: false,
      };

    case FileActions.CLIPBOARD_PASTE:
      return {
        ...state,
        isPastingFiles: true,
      };
    case FileActions.CLIPBOARD_PASTE_SUCCESS:
    case FileActions.CLIPBOARD_PASTE_FAILURE:
      return {
        ...state,
        isPastingFiles: false,
      };

    case FileActions.COPY_FILES:
      return {
        ...state,
        isCopyingFiles: true,
      };
    case FileActions.COPY_FILES_SUCCESS:
    case FileActions.COPY_FILES_FAILURE:
      return {
        ...state,
        isCopyingFiles: false,
      };
    case FileActions.DELETE_FILES:
      return {
        ...state,
        isDeletingFiles: true,
      };
    case FileActions.DELETE_FILES_SUCCESS:
    case FileActions.DELETE_FILES_FAILURE:
      return {
        ...state,
        isDeletingFiles: false,
      };
    case FileActions.DRAG_FILES_CHANGE_MODE:
      return {
        ...state,
        dragFilesMode: action.mode,
      };
    case FileActions.DRAG_FILES_START:
      return {
        ...state,
        isDraggingFiles: true,
        dragFilesMode: 'move',
      };
    case FileActions.DRAG_FILES_END:
      return {
        ...state,
        isDraggingFiles: false,
      };
    case FileActions.DOWNLOAD_FILES:
      return {
        ...state,
        isDownloadingFiles: true,
      };
    case FileActions.DOWNLOAD_FILES_SUCCESS:
    case FileActions.DOWNLOAD_FILES_FAILURE:
      return {
        ...state,
        isDownloadingFiles: false,
      };
    case FileActions.MOVE_FILES:
      return {
        ...state,
        isMovingFiles: true,
      };
    case FileActions.MOVE_FILES_SUCCESS:
    case FileActions.MOVE_FILES_FAILURE:
      return {
        ...state,
        isMovingFiles: false,
      };
    case FileActions.RENAME_FILE:
      return {
        ...state,
        isRenamingFile: true,
      };
    case FileActions.RENAME_FILE_SUCCESS:
    case FileActions.RENAME_FILE_FAILURE:
      return {
        ...state,
        isRenamingFile: false,
      };
    case FileActions.REPLACE_FILE:
      return {
        ...state,
        isReplacingFile: true,
      };
    case FileActions.REPLACE_FILE_SUCCESS:
    case FileActions.REPLACE_FILE_FAILURE:
      return {
        ...state,
        isReplacingFile: false,
      };

    case FileActions.UPLOAD_FILES:
      return {
        ...state,
        isUploadingFiles: true,
      };
    case FileActions.UPLOAD_FILES_CONFLICTS:
      return {
        ...state,
        isUploadingFiles: false,
      };
    case FileActions.UPLOAD_FILES_SUCCESS:
    case FileActions.UPLOAD_FILES_FAILURE:
      return {
        ...state,
        isUploadingFiles: false,
      };
    case FileActions.UNDO_FILES_ACTION:
      return {
        ...state,
        isUndoingFileAction: true,
      };
    case FileActions.UNDO_FILES_ACTION_SUCCESS:
    case FileActions.UNDO_FILES_ACTION_FAILURE:
      return {
        ...state,
        isUndoingFileAction: false,
      };

    default:
      return state;
  }
};
