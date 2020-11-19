import { Action } from 'redux';

export const RELOAD = '[GLOBAL] Relaod';
export const LOAD_FLASH_MESSAGES = '[GLOBAL] Load Flash messages';

export class Reload implements Action {
  readonly type = RELOAD;
}

export class LoadFlashMessages implements Action {
  readonly type = LOAD_FLASH_MESSAGES;
}
