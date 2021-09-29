/**
 Copyright 2020 Google Inc. All Rights Reserved.
 */
import '@material/mwc-radio';
import { Radio } from '@material/mwc-radio';
import { GraphicType, ListItemBase } from './mwc-list-item-base.js';
export declare class RadioListItemBase extends ListItemBase {
  protected slotElement: HTMLSlotElement | null;
  protected radioElement: Radio;
  left: boolean;
  graphic: GraphicType;
  protected _changeFromClick: boolean;
  render(): import('lit-element').TemplateResult;
  protected onClick(): void;
  protected onChange(evt: Event): Promise<void>;
}
