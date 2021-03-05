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

export * from './add-folder';
export * from './clipboard';
export * from './copy-files';
export * from './delete-files';
export * from './download-files';
export * from './drag-files';
export * from './edit-file';
export * from './move-files';
export * from './rename-files';
export * from './replace-file';
export * from './show-file';
export * from './success';
export * from './undo';
export * from './upload-files';

import * as AddFolderActions from './add-folder';
import * as ClipboardActions from './clipboard';
import * as CopyFileActions from './copy-files';
import * as DeleteActions from './delete-files';
import * as DownloadActions from './download-files';
import * as DragActions from './drag-files';
import * as EditFileActions from './edit-file';
import * as MoveFilesActions from './move-files';
import * as RenameFileActions from './rename-files';
import * as ReplaceFileActions from './replace-file';
import * as ShowFileActions from './show-file';
import * as UndoFileActions from './undo';
import * as UploadActions from './upload-files';

export type Actions =
  | AddFolderActions.AddFolder
  | AddFolderActions.AddFolderFailure
  | AddFolderActions.AddFolderSuccess
  | ClipboardActions.ClipboardPaste
  | ClipboardActions.ClipboardPasteFailure
  | ClipboardActions.ClipboardPasteSuccess
  | CopyFileActions.CopyFiles
  | CopyFileActions.CopyFilesFailure
  | CopyFileActions.CopyFilesSuccess
  | DeleteActions.DeleteFiles
  | DeleteActions.DeleteFilesConfirm
  | DeleteActions.DeleteFilesFailure
  | DeleteActions.DeleteFilesSuccess
  | DownloadActions.DownloadFiles
  | DownloadActions.DownloadFilesFailure
  | DownloadActions.DownloadFilesSuccess
  | DragActions.DragFilesChangeMode
  | DragActions.DragFilesEnd
  | DragActions.DragFilesStart
  | EditFileActions.EditFileMetadata
  | EditFileActions.EditFileStorage
  | MoveFilesActions.MoveFiles
  | MoveFilesActions.MoveFilesFailure
  | MoveFilesActions.MoveFilesSuccess
  | RenameFileActions.RenameFile
  | RenameFileActions.RenameFileFailure
  | RenameFileActions.RenameFileSuccess
  | ReplaceFileActions.ReplaceFile
  | ReplaceFileActions.ReplaceFileConfirm
  | ReplaceFileActions.ReplaceFileFailure
  | ReplaceFileActions.ReplaceFileSuccess
  | ShowFileActions.ShowFile
  | ShowFileActions.ShowFileInfo
  | UndoFileActions.UndoFilesAction
  | UndoFileActions.UndoFilesActionFailure
  | UndoFileActions.UndoFilesActionSuccess
  | UploadActions.UploadFiles
  | UploadActions.UploadFilesConflicts
  | UploadActions.UploadFilesFailure
  | UploadActions.UploadFilesSuccess;

export type ClipboardSelectionActions =
  | ClipboardActions.ClipboardCopyFile
  | ClipboardActions.ClipboardCutFile;
