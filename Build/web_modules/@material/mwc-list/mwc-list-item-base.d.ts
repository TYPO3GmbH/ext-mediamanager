/**
 @license
 Copyright 2020 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import '@material/mwc-ripple';
import { Ripple } from '@material/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';
import { LitElement } from 'lit-element';
export declare type SelectionSource = 'interaction' | 'property';
export interface RequestSelectedDetail {
  selected: boolean;
  source: SelectionSource;
}
export interface Layoutable {
  layout: (updateItems?: boolean) => void;
}
export declare type GraphicType =
  | 'avatar'
  | 'icon'
  | 'medium'
  | 'large'
  | 'control'
  | null;
/**
 * @fires request-selected {RequestSelectedDetail}
 * @fires list-item-rendered
 */
export declare class ListItemBase extends LitElement {
  protected slotElement: HTMLSlotElement | null;
  ripple: Promise<Ripple | null>;
  value: string;
  group: string | null;
  tabindex: number;
  disabled: boolean;
  twoline: boolean;
  activated: boolean;
  graphic: GraphicType;
  multipleGraphics: boolean;
  hasMeta: boolean;
  noninteractive: boolean;
  selected: boolean;
  protected shouldRenderRipple: boolean;
  _managingList: Layoutable | null;
  protected boundOnClick: () => void;
  protected _firstChanged: boolean;
  protected _skipPropRequest: boolean;
  protected rippleHandlers: RippleHandlers;
  protected listeners: {
    target: Element;
    eventNames: string[];
    cb: EventListenerOrEventListenerObject;
  }[];
  get text(): string;
  render(): import('lit-element').TemplateResult;
  protected renderRipple(): import('lit-element').TemplateResult;
  protected renderGraphic(): import('lit-element').TemplateResult;
  protected renderMeta(): import('lit-element').TemplateResult;
  protected renderText(): import('lit-element').TemplateResult;
  protected renderSingleLine(): import('lit-element').TemplateResult;
  protected renderTwoline(): import('lit-element').TemplateResult;
  protected onClick(): void;
  protected onDown(upName: string, evt: Event): void;
  protected fireRequestSelected(
    selected: boolean,
    source: SelectionSource
  ): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  protected firstUpdated(): void;
}
