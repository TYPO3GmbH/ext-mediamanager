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
export abstract class FormElement extends BaseElement {
  /**
   * Form-capable element in the component ShadowRoot.
   *
   * Define in your component with the `@query` decorator
   */
  protected abstract formElement: HTMLElement;

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  /**
   * Implement ripple getter for Ripple integration with mwc-formfield
   */
  readonly ripple?: RippleInterface | Promise<RippleInterface | null>;

  click() {
    if (this.formElement) {
      this.formElement.focus();
      this.formElement.click();
    }
  }

  setAriaLabel(label: string) {
    if (this.formElement) {
      this.formElement.setAttribute('aria-label', label);
    }
  }

  protected firstUpdated() {
    super.firstUpdated();
    this.mdcRoot.addEventListener('change', e => {
      this.dispatchEvent(new Event('change', e));
    });
  }
}
