/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { MenuBase } from './mwc-menu-base.js';
export { DefaultFocusState } from '@material/menu/constants.js';
export {
  createSetFromIndex,
  isEventMulti,
  isIndexSet,
  MWCListIndex,
} from '@material/mwc-list/mwc-list-foundation.js';
export { Corner, MenuCorner } from './mwc-menu-surface-base.js';
declare global {
  interface HTMLElementTagNameMap {
    'mwc-menu': MenuBase;
  }
}
export declare class Menu extends MenuBase {
  static styles: import('lit-element').CSSResult;
}
