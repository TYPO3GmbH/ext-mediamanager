/**
Copyright 2018 Google Inc. All Rights Reserved.
*/
import {
  addHasRemoveClass,
  BaseElement,
  CustomEventListener,
  EventType,
  SpecificEventListener,
} from './base-element.js';
import { HTMLElementWithRipple, RippleInterface } from './utils.js';
export {
  addHasRemoveClass,
  BaseElement,
  CustomEventListener,
  EventType,
  HTMLElementWithRipple,
  RippleInterface,
  SpecificEventListener,
};
/** @soyCompatible */
export declare abstract class FormElement extends BaseElement {
  /**
   * Form-capable element in the component ShadowRoot.
   *
   * Define in your component with the `@query` decorator
   */
  protected abstract formElement: HTMLElement;
  protected createRenderRoot(): ShadowRoot;
  /**
   * Implement ripple getter for Ripple integration with mwc-formfield
   */
  readonly ripple?: RippleInterface | Promise<RippleInterface | null>;
  click(): void;
  setAriaLabel(label: string): void;
  protected firstUpdated(): void;
}
