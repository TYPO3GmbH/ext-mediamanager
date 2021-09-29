/**
Copyright 2018 Google Inc. All Rights Reserved.
*/
import { LitElement } from 'lit-element';
export { addHasRemoveClass } from './utils.js';
/** @soyCompatible */
export class BaseElement extends LitElement {
    /**
     * Create and attach the MDC Foundation to the instance
     */
    createFoundation() {
        if (this.mdcFoundation !== undefined) {
            this.mdcFoundation.destroy();
        }
        if (this.mdcFoundationClass) {
            this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
            this.mdcFoundation.init();
        }
    }
    firstUpdated() {
        this.createFoundation();
    }
}
//# sourceMappingURL=base-element.js.map
