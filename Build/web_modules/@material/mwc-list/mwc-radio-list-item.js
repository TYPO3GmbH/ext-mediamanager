/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { __decorate } from "tslib";
import { customElement } from 'lit-element';
import { style as controlStyle } from './mwc-control-list-item-css.js';
import { style } from './mwc-list-item-css.js';
import { RadioListItemBase } from './mwc-radio-list-item-base.js';
let RadioListItem = class RadioListItem extends RadioListItemBase {
};
RadioListItem.styles = [style, controlStyle];
RadioListItem = __decorate([
    customElement('mwc-radio-list-item')
], RadioListItem);
export { RadioListItem };
//# sourceMappingURL=mwc-radio-list-item.js.map
