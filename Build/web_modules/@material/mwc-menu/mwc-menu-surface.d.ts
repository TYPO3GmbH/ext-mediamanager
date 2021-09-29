/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { MenuSurfaceBase } from './mwc-menu-surface-base.js';
export { MDCMenuDistance } from '@material/menu-surface/types.js';
export { Corner, MenuCorner } from './mwc-menu-surface-base.js';
declare global {
  interface HTMLElementTagNameMap {
    'mwc-menu-surface': MenuSurface;
  }
}
export declare class MenuSurface extends MenuSurfaceBase {
  static styles: import('lit-element').CSSResult;
}
