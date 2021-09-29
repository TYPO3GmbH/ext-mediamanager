/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import {
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
} from 'lit-element';

import styles from './typo3-splitpane.pcss';
import themeStyles from '../../../theme/index.pcss';

@customElement('typo3-splitpane')
export class Typo3Splitpane extends LitElement {
  public static styles = [themeStyles, styles];

  /**
   * Split layout is aligned horizontally by default. Set to "vertical" to change this.
   */
  @property({ type: String, reflect: true })
  orientation: string | null | undefined;

  private _primaryChild?: HTMLElement;

  private _secondaryChild?: HTMLElement;

  private _splitter?: HTMLElement;

  private _processing = false;

  private _startSize = { container: 0, primary: 0, secondary: 0 };

  private _movements: { x: number; y: number }[] = [];

  protected render() {
    return html`
      <slot
        id="primary"
        name="primary"
        @slotchange="${this._processChildren}"
      ></slot>
      <div
        part="splitter"
        id="splitter"
        @mousedown="${this._onResizeStart}"
        @touchstart="${this._onResizeStart}"
      >
        <div part="handle"></div>
      </div>
      <slot
        id="secondary"
        name="secondary"
        @slotchange="${this._processChildren}"
      ></slot>
      <div hidden>
        <slot @slotchange="${this._processChildren}"></slot>
      </div>
    `;
  }

  protected firstUpdated(props: PropertyValues) {
    // store reference before adding listeners
    this._splitter = this.renderRoot.querySelector('#splitter') as HTMLElement;
    super.firstUpdated(props);
    this._processChildren();
  }

  private _processChildren() {
    // Avoid calling method multiple times
    // after setting attribute on children
    if (!this._processing) {
      [this._primaryChild, this._secondaryChild].forEach((child, i) => {
        if (child && child.parentElement !== this) {
          child.style.flex = '';
          child.removeAttribute('slot');
          this[i === 0 ? '_primaryChild' : '_secondaryChild'] = undefined;
        }
      });

      this._processing = true;
      Array.from(this.children).forEach((node, i) => {
        const child = node as HTMLElement;
        if (i === 0) {
          this._primaryChild = child;
          child.setAttribute('slot', 'primary');
        } else if (i === 1) {
          this._secondaryChild = child;
          child.setAttribute('slot', 'secondary');
        } else {
          child.removeAttribute('slot');
        }
      });

      window.requestAnimationFrame(() => {
        this._processing = false;
      });
    }
  }

  private _handleMouseMove = (event: MouseEvent) => {
    this._resizeNavigation(event.x, event.y);
  };

  private _handleTouchMove = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    this._resizeNavigation(touch.clientX, touch.clientY);
  };

  private _resizeNavigation = (x: number, y: number) => {
    if (!this._primaryChild || !this._secondaryChild) {
      return;
    }

    const lastMove = this._movements[this._movements.length - 1];
    const dx = x - lastMove.x;
    const dy = y - lastMove.y;

    const isVertical = this.orientation === 'vertical';
    const distance = isVertical ? dy : dx;
    const isRtl = !isVertical && this.getAttribute('dir') === 'rtl';
    const dirDistance = isRtl ? -distance : distance;

    const { primary, secondary, container } = this._startSize;

    this._setFlexBasis(this._primaryChild, primary + dirDistance, container);
    this._setFlexBasis(
      this._secondaryChild,
      secondary - dirDistance,
      container
    );
  };

  //@eventOptions({passive: true})
  private _onResizeStart = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent && event.button === 2) {
      return;
    }

    if (event instanceof TouchEvent) {
      const touch = event.changedTouches[0];
      this._movements = [{ x: touch.clientX, y: touch.clientY }];
    } else if (event instanceof MouseEvent) {
      this._movements = [{ x: event.clientX, y: event.clientY }];
    }

    if (!this._primaryChild || !this._secondaryChild) {
      return;
    }
    event.stopPropagation();
    this._processing = true;
    document.addEventListener('mousemove', this._handleMouseMove, false);
    document.addEventListener('mouseup', this._onResizeStop, false);
    document.addEventListener('touchmove', this._handleTouchMove, false);
    document.addEventListener('touchend', this._onResizeStop, false);

    const size = this.orientation === 'vertical' ? 'height' : 'width';

    this._startSize = {
      container:
        this.getBoundingClientRect()[size] -
        (this._splitter as HTMLElement).getBoundingClientRect()[size],
      primary: this._primaryChild.getBoundingClientRect()[size],
      secondary: this._secondaryChild.getBoundingClientRect()[size],
    };
  };

  private _onResizeStop = () => {
    this._processing = false;
    document.removeEventListener('mousemove', this._handleMouseMove, false);
    document.removeEventListener('mouseup', this._onResizeStop, false);
    document.removeEventListener('touchmove', this._handleTouchMove, false);
    document.removeEventListener('touchend', this._onResizeStop, false);
    this.dispatchEvent(new CustomEvent('splitter-dragend'));
  };

  private _setFlexBasis(
    element: HTMLElement,
    flexBasis: number,
    containerSize: number
  ) {
    let basis = Math.max(0, Math.min(flexBasis, containerSize));
    if (basis === 0) {
      // Pure zero does not play well in Safari
      basis = 0.000001;
    }
    element.style.flex = `1 1 ${basis}px`;
  }
}
