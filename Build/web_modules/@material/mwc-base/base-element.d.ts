/**
Copyright 2018 Google Inc. All Rights Reserved.
*/
import { MDCFoundation } from '@material/base';
import { LitElement } from 'lit-element';
import { Constructor } from './utils.js';
export {
  CustomEventListener,
  EventType,
  SpecificEventListener,
} from '@material/base/types.js';
export { addHasRemoveClass } from './utils.js';
/** @soyCompatible */
export declare abstract class BaseElement extends LitElement {
  /**
   * Root element for MDC Foundation usage.
   *
   * Define in your component with the `@query` decorator
   */
  protected abstract mdcRoot: HTMLElement;
  /**
   * Return the foundation class for this component
   */
  protected abstract readonly mdcFoundationClass?: Constructor<MDCFoundation>;
  /**
   * An instance of the MDC Foundation class to attach to the root element
   */
  protected abstract mdcFoundation?: MDCFoundation;
  /**
   * Create the adapter for the `mdcFoundation`.
   *
   * Override and return an object with the Adapter's functions implemented:
   *
   *    {
   *      addClass: () => {},
   *      removeClass: () => {},
   *      ...
   *    }
   */
  protected abstract createAdapter(): {};
  /**
   * Create and attach the MDC Foundation to the instance
   */
  protected createFoundation(): void;
  protected firstUpdated(): void;
}
