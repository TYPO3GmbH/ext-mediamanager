import { Action } from 'redux';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { createSelector } from 'reselect';

export const ADD_FOLDER = '[FILE] ADD FOLDER';
export const ADD_FOLDER_SUCCESS = '[FILE] ADD FOLDER SUCCESS';
export const ADD_FOLDER_FAILURE = '[FILE] ADD FOLDER FAILURE';

export const CLIPBOARD_COPY_FILE = '[FILE][CLIPBOARD] COPY FILE';
export const CLIPBOARD_COPY_RELEASE_FILE =
  '[FILE][CLIPBOARD] COPY RELEASE FILE';
export const CLIPBOARD_CUT_FILE = '[FILE][CLIPBOARD] CUT FILE';
export const CLIPBOARD_CUT_RELEASE_FILE = '[FILE][CLIPBOARD] CUT RELEASE FILE';

export const CLIPBOARD_PASTE = '[FILE][CLIPBOARD] PASTE';
export const CLIPBOARD_PASTE_SUCCESS = '[FILE][CLIPBOARD] PASTE SUCCESS';
export const CLIPBOARD_PASTE_FAILURE = '[FILE][CLIPBOARD] PASTE FAILURE';

export const COPY_FILES = '[FILE] COPY FILES';
export const COPY_FILES_SUCCESS = '[FILE] COPY FILES SUCCESS';
export const COPY_FILES_FAILURE = '[FILE] COPY FILES FAILURE';

export const DELETE_FILES = '[FILE] DELETE FILES';
export const DELETE_FILES_SUCCESS = '[FILE] DELETE FILES SUCCESS';
export const DELETE_FILES_FAILURE = '[FILE] DELETE FILES FAILURE';

export const DOWNLOAD_FILES = '[FILE] DOWNLOAD FILES';
export const DOWNLOAD_FILES_SUCCESS = '[FILE] DOWNLOAD FILES SUCCESS';
export const DOWNLOAD_FILES_FAILURE = '[FILE] DOWNLOAD FILES FAILURE';

export const DRAG_FILES_START = '[FILE] DRAG FILES START';
export const DRAG_FILES_CHANGE_MODE = '[FILE] DRAG FILES CHANGE MODE';
export const DRAG_FILES_END = '[FILE] DRAG FILES END';

export const EDIT_FILE_STORAGE = '[FILE] EDIT FILE STORAGE';

export const MOVE_FILES = '[FILE] MOVE FILES';
export const MOVE_FILES_SUCCESS = '[FILE] MOVE FILES SUCCESS';
export const MOVE_FILES_FAILURE = '[FILE] MOVE FILES FAILURE';

export const RENAME_FILE = '[FILE] RENAME';
export const RENAME_FILE_SUCCESS = '[FILE] RENAME SUCCESS';
export const RENAME_FILE_FAILURE = '[FILE] RENAME FAILURE';

export const SHOW_FILE_INFO = '[FILE] SHOW FILE INFO';

export const UPLOAD_FILES = '[FILE] UPLOAD FILES';
export const UPLOAD_FILES_SUCCESS = '[FILE] UPLOAD FILES SUCCESS';
export const UPLOAD_FILES_FAILURE = '[FILE] UPLOAD FILES FAILURE';

export type FileActionsState = Readonly<{
  isAddingFolder: boolean;
  isDeletingFiles: boolean;
  isRenamingFile: boolean;
  isUploadingFiles: boolean;
  isDraggingFiles: boolean;
  isMovingFiles: boolean;
  isCopyingFiles: boolean;
  isPastingFiles: boolean;
  isDownloadingFiles: boolean;
  dragFilesMode: 'copy' | 'move';
}>;

const initialState: FileActionsState = {
  isAddingFolder: false,
  isDeletingFiles: false,
  isRenamingFile: false,
  isUploadingFiles: false,
  isDraggingFiles: false,
  isMovingFiles: false,
  isCopyingFiles: false,
  isPastingFiles: false,
  isDownloadingFiles: false,
  dragFilesMode: 'move',
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

    case CLIPBOARD_PASTE:
      return {
        ...state,
        isPastingFiles: true,
      };
    case CLIPBOARD_PASTE_SUCCESS:
    case CLIPBOARD_PASTE_FAILURE:
      return {
        ...state,
        isPastingFiles: false,
      };

    case COPY_FILES:
      return {
        ...state,
        isCopyingFiles: true,
      };
    case COPY_FILES_SUCCESS:
    case COPY_FILES_FAILURE:
      return {
        ...state,
        isCopyingFiles: false,
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
    case DRAG_FILES_CHANGE_MODE:
      return {
        ...state,
        dragFilesMode: action.mode,
      };
    case DRAG_FILES_START:
      return {
        ...state,
        isDraggingFiles: true,
        dragFilesMode: 'move',
      };
    case DRAG_FILES_END:
      return {
        ...state,
        isDraggingFiles: false,
      };
    case DOWNLOAD_FILES:
      return {
        ...state,
        isDownloadingFiles: true,
      };
    case DOWNLOAD_FILES_SUCCESS:
    case DOWNLOAD_FILES_FAILURE:
      return {
        ...state,
        isDownloadingFiles: false,
      };
    case MOVE_FILES:
      return {
        ...state,
        isMovingFiles: true,
      };
    case MOVE_FILES_SUCCESS:
    case MOVE_FILES_FAILURE:
      return {
        ...state,
        isMovingFiles: false,
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
  constructor(public identifiers: string[], public fileActionUrl: string) {}
}

export class DeleteFilesSuccess implements Action {
  readonly type = DELETE_FILES_SUCCESS;
}

export class DeleteFilesFailure implements Action {
  readonly type = DELETE_FILES_FAILURE;
}

export class ShowFileInfo implements Action {
  readonly type = SHOW_FILE_INFO;
  constructor(
    public identifier: string,
    public sys_type: '_FILE' | '_FOLDER'
  ) {}
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

export class DragFilesChangeMode implements Action {
  readonly type = DRAG_FILES_CHANGE_MODE;
  constructor(public mode: 'move' | 'copy') {}
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

export class MoveFiles implements Action {
  readonly type = MOVE_FILES;
  constructor(
    public identifiers: string[],
    public target: Typo3Node,
    public fileActionUrl: string
  ) {}
}

export class MoveFilesFailure implements Action {
  readonly type = MOVE_FILES_FAILURE;
}

export class MoveFilesSuccess implements Action {
  readonly type = MOVE_FILES_SUCCESS;
}

export class CopyFiles implements Action {
  readonly type = COPY_FILES;
  constructor(
    public identifiers: string[],
    public target: Typo3Node,
    public fileActionUrl: string
  ) {}
}

export class CopyFilesFailure implements Action {
  readonly type = COPY_FILES_FAILURE;
}

export class CopyFilesSuccess implements Action {
  readonly type = COPY_FILES_SUCCESS;
}

export class ClipboardCopyFile implements Action {
  readonly type = CLIPBOARD_COPY_FILE;
  constructor(public clipboardIdentifier: string, public identifier: string) {}
}

export class ClipboardCopyReleaseFile implements Action {
  readonly type = CLIPBOARD_COPY_RELEASE_FILE;
  readonly identifier = '0';
  constructor(public clipboardIdentifier: string) {}
}

export class ClipboardCutFile implements Action {
  readonly type = CLIPBOARD_CUT_FILE;
  constructor(public clipboardIdentifier: string, public identifier: string) {}
}

export class ClipboardCutReleaseFile implements Action {
  readonly type = CLIPBOARD_CUT_RELEASE_FILE;
  readonly identifier = '0';
  constructor(public clipboardIdentifier: string) {}
}

export class ClipboardPaste implements Action {
  readonly type = CLIPBOARD_PASTE;
  constructor(public targetIdentifier: string, public fileActionUrl: string) {}
}

export class ClipboardPasteFailure implements Action {
  readonly type = CLIPBOARD_PASTE_FAILURE;
}

export class ClipboardPasteSuccess implements Action {
  readonly type = CLIPBOARD_PASTE_SUCCESS;
}

export class DownloadFiles implements Action {
  readonly type = DOWNLOAD_FILES;
  constructor(public identifiers: string[]) {}
}

export class DownloadFilesSuccess implements Action {
  readonly type = DOWNLOAD_FILES_SUCCESS;
}

export class DownloadFilesFailure implements Action {
  readonly type = DOWNLOAD_FILES_FAILURE;
}

export class EditFileStorage implements Action {
  readonly type = EDIT_FILE_STORAGE;
  constructor(public identifier: string) {}
}

export type Actions =
  | AddFolder
  | AddFolderFailure
  | AddFolderSuccess
  | ClipboardPaste
  | ClipboardPasteFailure
  | ClipboardPasteSuccess
  | CopyFiles
  | CopyFilesFailure
  | CopyFilesSuccess
  | DeleteFiles
  | DeleteFilesFailure
  | DeleteFilesSuccess
  | DownloadFiles
  | DownloadFilesSuccess
  | DownloadFilesFailure
  | DragFilesChangeMode
  | DragFilesEnd
  | DragFilesStart
  | EditFileStorage
  | MoveFiles
  | MoveFilesFailure
  | MoveFilesSuccess
  | RenameFile
  | RenameFileFailure
  | RenameFileSuccess
  | ShowFileInfo
  | UploadFiles
  | UploadFilesFailure
  | UploadFilesSuccess;

export type ClipboardSelectionActions =
  | ClipboardCopyFile
  | ClipboardCopyReleaseFile
  | ClipboardCutFile
  | ClipboardCutReleaseFile;

export const isExecutingFileAction = createSelector(
  (state: FileActionsState) => state,
  state =>
    state.isUploadingFiles ||
    state.isDeletingFiles ||
    state.isAddingFolder ||
    state.isRenamingFile ||
    state.isMovingFiles ||
    state.isCopyingFiles ||
    state.isPastingFiles
);

export const getDragMode = createSelector(
  (state: FileActionsState) => state,
  state => state.dragFilesMode
);
