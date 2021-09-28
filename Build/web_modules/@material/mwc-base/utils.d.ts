/**
Copyright 2018 Google Inc. All Rights Reserved.
*/
/**
 * Determines whether a node is an element.
 *
 * @param node Node to check
 */
export declare const isNodeElement: (node: Node) => node is Element;
export declare function findAssignedElement(
  slot: HTMLSlotElement,
  selector: string
): HTMLElement | null;
export declare type Constructor<T> = new (...args: any[]) => T;
export declare function addHasRemoveClass(
  element: HTMLElement
): {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  hasClass: (className: string) => boolean;
};
/**
 * Do event listeners suport the `passive` option?
 */
export declare const supportsPassiveEventListener = false;
export declare const deepActiveElementPath: (doc?: Document) => Element[];
export declare const doesElementContainFocus: (element: HTMLElement) => boolean;
export interface HTMLElementWithRipple extends HTMLElement {
  ripple?: RippleInterface;
}
export interface RippleInterface {
  startPress: (e?: Event) => void;
  endPress: () => void;
  startFocus: () => void;
  endFocus: () => void;
}
