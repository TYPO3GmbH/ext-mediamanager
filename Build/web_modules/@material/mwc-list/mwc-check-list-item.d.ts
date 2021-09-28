/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { CheckListItemBase } from './mwc-check-list-item-base.js';
declare global {
  interface HTMLElementTagNameMap {
    'mwc-check-list-item': CheckListItem;
  }
}
export declare class CheckListItem extends CheckListItemBase {
  static styles: import('lit-element').CSSResult[];
}
