/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { ListItemBase } from './mwc-list-item-base.js';
export { GraphicType, RequestSelectedDetail } from './mwc-list-item-base.js';
declare global {
  interface HTMLElementTagNameMap {
    'mwc-list-item': ListItem;
  }
}
export declare class ListItem extends ListItemBase {
  static styles: import('lit-element').CSSResult;
}
