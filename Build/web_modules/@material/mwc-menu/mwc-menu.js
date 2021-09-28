/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { __decorate } from "tslib";
import { customElement } from 'lit-element';
import { MenuBase } from './mwc-menu-base.js';
import { style } from './mwc-menu-css.js';
export { DefaultFocusState } from '@material/menu/constants.js';
export { createSetFromIndex, isEventMulti, isIndexSet } from '@material/mwc-list/mwc-list-foundation.js';
let Menu = class Menu extends MenuBase {
};
Menu.styles = style;
Menu = __decorate([
    customElement('mwc-menu')
], Menu);
export { Menu };
//# sourceMappingURL=mwc-menu.js.map
