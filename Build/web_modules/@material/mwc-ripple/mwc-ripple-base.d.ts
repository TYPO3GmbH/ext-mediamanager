/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

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
import { BaseElement } from '@material/mwc-base/base-element.js';
import { MDCRippleAdapter } from '@material/ripple/adapter.js';
import MDCRippleFoundation from '@material/ripple/foundation.js';
import { RippleAPI } from './ripple-handlers.js';
/** @soyCompatible */
export declare class RippleBase extends BaseElement implements RippleAPI {
  mdcRoot: HTMLElement;
  primary: boolean;
  accent: boolean;
  unbounded: boolean;
  disabled: boolean;
  activated: boolean;
  selected: boolean;
  private hovering;
  private bgFocused;
  private fgActivation;
  private fgDeactivation;
  private fgScale;
  private fgSize;
  private translateStart;
  private translateEnd;
  private leftPos;
  private topPos;
  protected mdcFoundationClass: typeof MDCRippleFoundation;
  protected mdcFoundation: MDCRippleFoundation;
  get isActive(): boolean;
  createAdapter(): MDCRippleAdapter;
  startPress(ev?: Event): void;
  endPress(): void;
  startFocus(): void;
  endFocus(): void;
  startHover(): void;
  endHover(): void;
  /**
   * Wait for the MDCFoundation to be created by `firstUpdated`
   */
  protected waitForFoundation(fn: () => void): void;
  /** @soyCompatible */
  protected render(): import('lit-element').TemplateResult;
}
