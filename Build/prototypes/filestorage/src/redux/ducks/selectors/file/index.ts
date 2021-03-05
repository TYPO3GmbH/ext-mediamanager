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

import { createSelector } from 'reselect';
import { RootState } from '../../reducers';
import { FileActionsState } from '../../reducers/file/file-actions';

export const isExecutingFileAction = createSelector(
  (state: FileActionsState) => state,
  state =>
    state.isUploadingFiles ||
    state.isDeletingFiles ||
    state.isAddingFolder ||
    state.isRenamingFile ||
    state.isMovingFiles ||
    state.isCopyingFiles ||
    state.isPastingFiles ||
    state.isUndoingFileAction ||
    state.isReplacingFile
);

const fileActionsSelector = (state: RootState) => state.fileActions;

export const getDragMode = createSelector(
  fileActionsSelector,
  fileActions => fileActions.dragFilesMode
);

export const isCopyDragMode = createSelector(
  fileActionsSelector,
  fileActions => fileActions.dragFilesMode === 'copy'
);

export const isDraggingFiles = createSelector(
  fileActionsSelector,
  fileActions => fileActions.isDraggingFiles
);

export const isDownloadingFiles = createSelector(
  fileActionsSelector,
  fileActions => fileActions.isDownloadingFiles
);
