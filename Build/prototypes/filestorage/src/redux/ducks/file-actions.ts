import { Action } from 'redux';

export const RENAME_FILE = '[FILE] Rename';
export const DELETE_FILES = '[FILE] Delete files';
export const SHOW_FILE_INFO = '[FILE] Show file info';

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
