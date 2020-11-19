import { Action } from 'redux';

export const RENAME_FILE = '[FILE] Rename';

export class RenameFile implements Action {
  readonly type = RENAME_FILE;
  constructor(
    public identifier: string,
    public name: string,
    public fileActionUrl: string
  ) {}
}
