/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { ListBase } from './mwc-list-base.js';
export {
  createSetFromIndex,
  isEventMulti,
  isIndexSet,
  MWCListIndex,
} from './mwc-list-foundation.js';
declare global {
  interface HTMLElementTagNameMap {
    'mwc-list': List;
  }
}
export declare class List extends ListBase {
  static styles: import('lit-element').CSSResult;
}
