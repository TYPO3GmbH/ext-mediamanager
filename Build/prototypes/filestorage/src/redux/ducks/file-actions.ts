import { Action } from 'redux';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { createSelector } from 'reselect';

export const RENAME_FILE = '[FILE] RENAME';
export const RENAME_FILE_SUCCESS = '[FILE] RENAME SUCCESS';
export const RENAME_FILE_FAILURE = '[FILE] RENAME FAILURE';

export const DELETE_FILES = '[FILE] DELETE FILES';
export const DELETE_FILES_SUCCESS = '[FILE] DELETE FILES SUCCESS';
export const DELETE_FILES_FAILURE = '[FILE] DELETE FILES';

export const ADD_FOLDER = '[FILE] ADD FOLDER';
export const ADD_FOLDER_SUCCESS = '[FILE] ADD FOLDER SUCCESS';
export const ADD_FOLDER_FAILURE = '[FILE] ADD FOLDER FAILURE';

export const UPLOAD_FILES = '[FILE] UPLOAD FILES';
export const UPLOAD_FILES_SUCCESS = '[FILE] UPLOAD FILES SUCCESS';
export const UPLOAD_FILES_FAILURE = '[FILE] UPLOAD FILES FAILURE';

export const DRAG_FILES_START = '[FILE] DRAG START';
export const DRAG_FILES_END = '[FILE] DRAG END';

export const SHOW_FILE_INFO = '[FILE] SHOW FILE INFO';

export type FileActionsState = Readonly<{
  isAddingFolder: boolean;
  isDeletingFiles: boolean;
  isRenamingFile: boolean;
  isUploadingFiles: boolean;
  isDraggingFiles: boolean;
}>;

const initialState: FileActionsState = {
  isAddingFolder: false,
  isDeletingFiles: false,
  isRenamingFile: false,
  isUploadingFiles: false,
  isDraggingFiles: false,
};

export const fileActionsReducer = (
  state = initialState,
  action: Actions
): FileActionsState => {
  switch (action.type) {
    case ADD_FOLDER:
      return {
        ...state,
        isAddingFolder: true,
      };
    case ADD_FOLDER_SUCCESS:
    case ADD_FOLDER_FAILURE:
      return {
        ...state,
        isAddingFolder: false,
      };
    case DELETE_FILES:
      return {
        ...state,
        isDeletingFiles: true,
      };
    case DELETE_FILES_SUCCESS:
    case DELETE_FILES_FAILURE:
      return {
        ...state,
        isDeletingFiles: false,
      };
    case DRAG_FILES_START:
      return {
        ...state,
        isDraggingFiles: true,
      };
    case DRAG_FILES_END:
      return {
        ...state,
        isDraggingFiles: false,
      };
    case RENAME_FILE:
      return {
        ...state,
        isRenamingFile: true,
      };
    case RENAME_FILE_SUCCESS:
    case RENAME_FILE_FAILURE:
      return {
        ...state,
        isRenamingFile: false,
      };
    case UPLOAD_FILES:
      return {
        ...state,
        isUploadingFiles: true,
      };
    case UPLOAD_FILES_SUCCESS:
    case UPLOAD_FILES_FAILURE:
      return {
        ...state,
        isUploadingFiles: false,
      };
    default:
      return state;
  }
};

export class RenameFile implements Action {
  readonly type = RENAME_FILE;
  constructor(
    public identifier: string,
    public name: string,
    public fileActionUrl: string
  ) {}
}

export class RenameFileSuccess implements Action {
  readonly type = RENAME_FILE_SUCCESS;
}

export class RenameFileFailure implements Action {
  readonly type = RENAME_FILE_FAILURE;
}

export class DeleteFiles implements Action {
  readonly type = DELETE_FILES;
  constructor(public uids: string[], public fileActionUrl: string) {}
}

export class DeleteFilesSuccess implements Action {
  readonly type = DELETE_FILES_SUCCESS;
}

export class DeleteFilesFailure implements Action {
  readonly type = DELETE_FILES_FAILURE;
}

export class ShowFileInfo implements Action {
  readonly type = SHOW_FILE_INFO;
  constructor(public uid: string, public sys_type: '_FILE' | '_FOLDER') {}
}

export class AddFolder implements Action {
  readonly type = ADD_FOLDER;
  constructor(
    public node: Typo3Node,
    public parentNode: Typo3Node,
    public fileActionUrl: string
  ) {}
}

export class DragFilesEnd implements Action {
  readonly type = DRAG_FILES_END;
}

export class DragFilesStart implements Action {
  readonly type = DRAG_FILES_START;
}

export class AddFolderSuccess implements Action {
  readonly type = ADD_FOLDER_SUCCESS;
}

export class AddFolderFailure implements Action {
  readonly type = ADD_FOLDER_FAILURE;
}

export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;
  constructor(
    public dataTransfer: DataTransfer,
    public node: Typo3Node,
    public fileActionUrl: string
  ) {}
}

export class UploadFilesSuccess implements Action {
  readonly type = UPLOAD_FILES_SUCCESS;
}

export class UploadFilesFailure implements Action {
  readonly type = UPLOAD_FILES_FAILURE;
}

export type Actions =
  | AddFolder
  | AddFolderSuccess
  | AddFolderFailure
  | RenameFile
  | RenameFileSuccess
  | RenameFileFailure
  | DeleteFiles
  | DeleteFilesSuccess
  | DeleteFilesFailure
  | DragFilesEnd
  | DragFilesStart
  | UploadFiles
  | UploadFilesSuccess
  | UploadFilesFailure
  | ShowFileInfo;

export const isExecutingFileAction = createSelector(
  (state: FileActionsState) => state,
  state =>
    state.isUploadingFiles ||
    state.isDeletingFiles ||
    state.isAddingFolder ||
    state.isRenamingFile
);
