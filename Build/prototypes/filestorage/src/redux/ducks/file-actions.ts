import { Action } from 'redux';
import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';

export const RENAME_FILE = '[FILE] Rename';
export const DELETE_FILES = '[FILE] Delete files';
export const SHOW_FILE_INFO = '[FILE] Show file info';
export const ADD_FOLDER = '[FILE] Add folder';
export const UPLOAD_FILES = '[FILE] Upload files';

export class RenameFile implements Action {
  readonly type = RENAME_FILE;
  constructor(
    public identifier: string,
    public name: string,
    public fileActionUrl: string
  ) {}
}

export class DeleteFiles implements Action {
  readonly type = DELETE_FILES;
  constructor(public uids: string[], public fileActionUrl: string) {}
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

export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;
  constructor(
    public dataTransfer: DataTransfer,
    public node: Typo3Node,
    public fileActionUrl: string
  ) {}
}
