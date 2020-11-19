import { Action } from 'redux';

export const RELOAD = '[GLOBAL] Relaod';

export class Reload implements Action {
  readonly type = RELOAD;
}
