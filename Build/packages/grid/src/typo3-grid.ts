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
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-grid.pcss';
import themeStyles from '../../../theme/index.pcss';
import { Typo3Card } from '../../card/src/typo3-card';
import { deepActiveElementPath } from '@material/mwc-base/utils';

/**
 * @fires typo3-grid-selection-changed - Dispatched when selection has changed
 */
@customElement('typo3-grid')
export class Typo3Grid extends LitElement {
  public static styles = [themeStyles, styles];

  @query('.grid') grid!: HTMLElement;
  @query('slot') slotElement!: HTMLSlotElement;

  @property({ type: Boolean, reflect: true }) selectable = false;
  // used for triggering updates
  @property({ type: String }) hash = '';

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    if (_changedProperties.has('hash') && this.items.length > 0) {
      this.items[0].tabindex = 0;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
  }

  render(): TemplateResult {
    return html`
      <div class="grid">
        <slot
          name="item"
          @click="${this._onItemClick}"
          @focusin=${this._onFocusIn}
        ></slot>
      </div>
    `;
  }

  get items(): Typo3Card[] {
    return (this.slotElement!.assignedElements() as Typo3Card[]).filter(
      element => false === element.notSelectable
    );
  }

  get selectedItems(): Typo3Card[] {
    return this.items.filter(element => element.hasAttribute('selected'));
  }

  _onFocusIn = (event: Event) => {
    this.items.forEach(item => {
      item.tabindex = item === event.target ? 0 : -1;
    });
  };

  _onItemClick = (event: MouseEvent) => {
    event.stopPropagation();
    const element = event.target as Typo3Card;

    if (false === this.selectable || false === this.items.includes(element)) {
      return;
    }

    const isTogglButtonClick = event
      .composedPath()
      .some(element => (element as HTMLElement).tagName === 'BUTTON');

    const multiSelection =
      !!(event.metaKey || event.ctrlKey) || isTogglButtonClick;

    if (!element.hasAttribute('selected')) {
      this.selectItems([element], multiSelection);
    } else if (multiSelection) {
      const items = this.selectedItems.filter(
        selectedItem => selectedItem != element
      );

      this.selectItems(items, false);
    }
  };

  _onKeyDown = (event: KeyboardEvent) => {
    const startFocusedElementIndex = this.focusedElementIndex;
    switch (event.key) {
      case 'Escape':
        this.selectItems([], false);
        event.preventDefault();
        break;
      case 'Enter':
        if (this.focusedElementIndex !== -1) {
          this.items[this.focusedElementIndex].click();
          event.preventDefault();
        }
        break;
      case 'a':
        if (event.metaKey || event.ctrlKey) {
          this.selectItems(this.items);
          event.preventDefault();
        }
        break;
      case 'ArrowRight':
        this.focusElement(this.focusedElementIndex + 1);
        if (event.shiftKey) {
          this.selectItems(
            this.items.slice(
              startFocusedElementIndex,
              this.focusedElementIndex + 1
            )
          );
        }
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.focusElement(this.focusedElementIndex - 1);
        if (event.shiftKey) {
          this.selectItems(
            this.items.slice(
              this.focusedElementIndex,
              startFocusedElementIndex + 1
            )
          );
        }
        break;
      case 'ArrowDown':
        this.focusElement(this.focusedElementIndex + this.numOfColumns);
        if (event.shiftKey) {
          this.selectItems(
            this.items.slice(
              startFocusedElementIndex,
              this.focusedElementIndex + 1
            )
          );
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.focusElement(this.focusedElementIndex - this.numOfColumns);
        if (event.shiftKey) {
          this.selectItems(
            this.items.slice(
              this.focusedElementIndex,
              startFocusedElementIndex + 1
            )
          );
        }
        event.preventDefault();
        break;
      case 'Home':
        this.focusElement(0);
        event.preventDefault();
        break;
      case 'End':
        this.focusElement(this.items.length - 1);
        event.preventDefault();
        break;
      default:
      // do nothing
    }
  };

  get focusedElementIndex(): number {
    const activeElementPath = deepActiveElementPath();
    if (!activeElementPath.length) {
      return -1;
    }

    for (let i = activeElementPath.length - 1; i >= 0; i--) {
      const activeItem = activeElementPath[i];

      if (activeItem.tagName === 'TYPO3-CARD') {
        return this.items.indexOf(activeItem as Typo3Card);
      }
    }

    return -1;
  }

  focusElement(index: number): void {
    const element = this.items[index];
    if (element) {
      element.focus();
    }
  }

  get numOfColumns(): number {
    const gridWidth = this.grid.offsetWidth;
    const minWidth = parseFloat(
      getComputedStyle(this.grid, null).getPropertyValue(
        'grid-template-columns'
      )
    );

    const gap = parseFloat(
      getComputedStyle(this.grid, null).getPropertyValue('column-gap')
    );
    return Math.round((gridWidth + gap) / (minWidth + gap));
  }

  protected selectItems(items: HTMLElement[], addToSelection = true): void {
    if (false === this.selectable) {
      return;
    }

    if (false === addToSelection) {
      this.selectedItems.forEach(item => item.removeAttribute('selected'));
    }

    items.forEach(item => item.setAttribute('selected', 'selected'));
    this.dispatchEvent(
      new CustomEvent('typo3-grid-selection-changed', {
        detail: this.selectedItems,
      })
    );
  }
}
