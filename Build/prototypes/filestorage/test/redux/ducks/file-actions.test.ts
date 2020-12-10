import { expect } from '@open-wc/testing';
import * as fromFileActions from '../../../src/redux/ducks/file-actions';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { FileActionsState } from '../../../src/redux/ducks/file-actions';

describe('File Actions reducer', () => {
  it('can return the initial state', () => {
    const state = fromFileActions.fileActionsReducer(
      undefined,
      {} as fromFileActions.Actions
    );
    const expectedState = {
      isAddingFolder: false,
      isDeletingFiles: false,
      isRenamingFile: false,
      isUploadingFiles: false,
      isDraggingFiles: false,
      isMovingFiles: false,
      isCopyingFiles: false,
      isPastingFiles: false,
      isDownloadingFiles: false,
      isUndoingFileAction: false,
      dragFilesMode: 'move',
    };

    expect(state).to.be.eql(expectedState);
  });

  it('can handle `AddFolder`', () => {
    const action = new fromFileActions.AddFolder(
      { identifier: 'id-1' } as Typo3Node,
      {} as Typo3Node
    );
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isAddingFolder).to.be.true;
  });

  it('can handle `AddFolderSuccess`', () => {
    const action = new fromFileActions.AddFolderSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isAddingFolder).to.be.false;
  });

  it('can handle `AddFolderFailure`', () => {
    const action = new fromFileActions.AddFolderFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isAddingFolder).to.be.false;
  });

  it('can handle `DeleteFiles`', () => {
    const action = new fromFileActions.DeleteFiles(['id-1']);
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDeletingFiles).to.be.true;
  });

  it('can handle `DeleteFilesSuccess`', () => {
    const action = new fromFileActions.DeleteFilesSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDeletingFiles).to.be.false;
  });

  it('can handle `DeleteFilesFailure`', () => {
    const action = new fromFileActions.DeleteFilesFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDeletingFiles).to.be.false;
  });

  it('can handle `RenameFile`', () => {
    const action = new fromFileActions.RenameFile('id-1', 'new-node');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isRenamingFile).to.be.true;
  });

  it('can handle `RenameFileSuccess`', () => {
    const action = new fromFileActions.RenameFileSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isRenamingFile).to.be.false;
  });

  it('can handle `RenameFileFailure`', () => {
    const action = new fromFileActions.RenameFileFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isRenamingFile).to.be.false;
  });

  it('can handle `UploadFiles`', () => {
    const action = new fromFileActions.UploadFiles(
      {} as DataTransfer,
      { identifer: 'id-1' } as Typo3Node
    );
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isUploadingFiles).to.be.true;
  });

  it('can handle `UploadFilesSuccess`', () => {
    const action = new fromFileActions.UploadFilesSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isUploadingFiles).to.be.false;
  });

  it('can handle `UploadFilesFailure`', () => {
    const action = new fromFileActions.UploadFilesFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isUploadingFiles).to.be.false;
  });

  it('can handle `DragFilesStart`', () => {
    const action = new fromFileActions.DragFilesStart();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDraggingFiles).to.be.true;
  });

  it('can handle `DragFilesChangeMode`', () => {
    const action = new fromFileActions.DragFilesChangeMode('copy');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.dragFilesMode).to.be.eql('copy');
  });

  it('can handle `DragFilesEnd`', () => {
    const action = new fromFileActions.DragFilesEnd();
    const state = fromFileActions.fileActionsReducer(
      { isDraggingFiles: true } as FileActionsState,
      action
    );
    expect(state.isDraggingFiles).to.be.false;
  });

  it('can handle `MoveFiles`', () => {
    const action = new fromFileActions.MoveFiles(['id-1'], {} as Typo3Node);
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isMovingFiles).to.be.true;
  });

  it('can handle `MoveFilesSuccess`', () => {
    const action = new fromFileActions.MoveFilesSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isMovingFiles).to.be.false;
  });

  it('can handle `MoveFilesFailure`', () => {
    const action = new fromFileActions.MoveFilesFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isMovingFiles).to.be.false;
  });

  it('can handle `CopyFiles`', () => {
    const action = new fromFileActions.CopyFiles(['id-1'], {} as Typo3Node);
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isCopyingFiles).to.be.true;
  });

  it('can handle `CopyFilesSuccess`', () => {
    const action = new fromFileActions.CopyFilesSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isCopyingFiles).to.be.false;
  });

  it('can handle `CopyFilesFailure`', () => {
    const action = new fromFileActions.CopyFilesFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isCopyingFiles).to.be.false;
  });

  it('can handle `ClipboardPaste`', () => {
    const action = new fromFileActions.ClipboardPaste({} as Typo3Node);
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isPastingFiles).to.be.true;
  });

  it('can handle `ClipboardPasteSuccess`', () => {
    const action = new fromFileActions.ClipboardPasteSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isPastingFiles).to.be.false;
  });

  it('can handle `ClipboardPasteSuccess`', () => {
    const action = new fromFileActions.ClipboardPasteFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isPastingFiles).to.be.false;
  });

  it('can handle `DownloadFiles`', () => {
    const action = new fromFileActions.DownloadFiles(['id-1']);
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDownloadingFiles).to.be.true;
  });

  it('can handle `DownloadFilesSuccess`', () => {
    const action = new fromFileActions.DownloadFilesSuccess();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDownloadingFiles).to.be.false;
  });

  it('can handle `DownloadFilesFailure`', () => {
    const action = new fromFileActions.DownloadFilesFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isDownloadingFiles).to.be.false;
  });

  it('can handle `UndoFilesAction`', () => {
    const action = new fromFileActions.UndoFilesAction({});
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isUndoingFileAction).to.be.true;
  });

  it('can handle `UndoFilesActionSuccess`', () => {
    const action = new fromFileActions.UndoFilesActionSuccess('success');
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isUndoingFileAction).to.be.false;
  });

  it('can handle `UndoFilesActionFailure`', () => {
    const action = new fromFileActions.UndoFilesActionFailure();
    const state = fromFileActions.fileActionsReducer(undefined, action);
    expect(state.isUndoingFileAction).to.be.false;
  });
});
