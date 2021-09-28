/**
 Copyright 2020 Google Inc. All Rights Reserved.
 */
import '@material/mwc-checkbox';
import { Checkbox } from '@material/mwc-checkbox';
import { GraphicType, ListItemBase } from './mwc-list-item-base.js';
export declare class CheckListItemBase extends ListItemBase {
  protected slotElement: HTMLSlotElement | null;
  protected checkboxElement: Checkbox;
  left: boolean;
  graphic: GraphicType;
  render(): import('lit-element').TemplateResult;
  protected onChange(evt: Event): Promise<void>;
}
