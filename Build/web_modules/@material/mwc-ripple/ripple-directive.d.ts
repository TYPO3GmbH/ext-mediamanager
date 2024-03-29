import { RippleInterface } from '@material/mwc-base/form-element.js';
import MDCRippleFoundation from '@material/ripple/foundation.js';
import { PropertyPart } from 'lit-html';
export interface RippleOptions {
  interactionNode?: HTMLElement;
  unbounded?: boolean;
  disabled?: boolean;
  active?: boolean;
}
export interface RippleNodeOptions extends RippleOptions {
  surfaceNode: HTMLElement;
}
/**
 * force the ripple directive to share API names with `mwc-ripple` after Closure
 * Compiler.
 */
declare class RippleIntermediate implements RippleInterface {
  private readonly foundation;
  constructor(foundation: MDCRippleFoundation);
  startPress(): void;
  endPress(): void;
  startFocus(): void;
  endFocus(): void;
  destroy(): void;
  setUnbounded(value: boolean): void;
}
declare global {
  interface Element {
    ripple?: unknown;
  }
}
/**
 * Applied a ripple to the node specified by {surfaceNode}.
 * @param options {RippleNodeOptions}
 */
export declare const rippleNode: (
  options: RippleNodeOptions
) => RippleIntermediate;
/**
 * A directive that applies a Material ripple to a part node. The directive
 * should be applied to a PropertyPart.
 * @param options {RippleOptions}
 */
export declare const ripple: (
  options?: RippleOptions
) => (part: PropertyPart) => void;
export {};
