/**
Copyright 2018 Google Inc. All Rights Reserved.
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
