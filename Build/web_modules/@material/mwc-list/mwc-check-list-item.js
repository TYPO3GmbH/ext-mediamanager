/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { __decorate } from "tslib";
import { customElement } from 'lit-element';
import { CheckListItemBase } from './mwc-check-list-item-base.js';
import { style as controlStyle } from './mwc-control-list-item-css.js';
import { style } from './mwc-list-item-css.js';
let CheckListItem = class CheckListItem extends CheckListItemBase {
};
CheckListItem.styles = [style, controlStyle];
CheckListItem = __decorate([
    customElement('mwc-check-list-item')
], CheckListItem);
export { CheckListItem };
//# sourceMappingURL=mwc-check-list-item.js.map
