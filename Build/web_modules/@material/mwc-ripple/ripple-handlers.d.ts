/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { RippleInterface } from '@material/mwc-base/utils.js';
export interface RippleAPI extends RippleInterface {
  startHover: () => void;
  endHover: () => void;
}
/**
 * Class that encapsulates the events handlers for `mwc-ripple`
 *
 *
 * Example:
 * ```
 * class XFoo extends LitElement {
 *   async getRipple() {
 *     this.renderRipple = true;
 *     await this.updateComplete;
 *     return this.renderRoot.querySelector('mwc-ripple');
 *   }
 *   rippleHandlers = new RippleHandlers(() => this.getRipple());
 *
 *   render() {
 *     return html`
 *       <div @mousedown=${this.rippleHandlers.startPress}></div>
 *       ${this.renderRipple ? html`<mwc-ripple></mwc-ripple>` : ''}
 *     `;
 *   }
 * }
 * ```
 */
export declare class RippleHandlers implements RippleAPI {
  startPress: (ev?: Event) => void;
  endPress: () => void;
  startFocus: () => void;
  endFocus: () => void;
  startHover: () => void;
  endHover: () => void;
  constructor(
    /** Function that returns a `mwc-ripple` */
    rippleFn: () => Promise<RippleAPI | null>
  );
}
