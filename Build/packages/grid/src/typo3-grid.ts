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
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-grid.pcss';
import themeStyles from '../../../theme/index.pcss';
import { Typo3Card } from '../../card/src/typo3-card';

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
        <slot name="item" @click="${this._onItemClick}"></slot>
      </div>
    `;
  }

  firstUpdated(): void {
    this.setAttribute('tabIndex', '-1');
  }

  get items(): Typo3Card[] {
    return (this.slotElement!.assignedElements() as Typo3Card[]).filter(
      element => false === element.notSelectable
    );
  }

  get selectedItems(): Typo3Card[] {
    return this.items.filter(element => element.hasAttribute('selected'));
  }

  _onItemClick = (event: MouseEvent) => {
    event.stopPropagation();
    const element = event.target as Typo3Card;
    if (false === this.selectable || false === this.items.includes(element)) {
      return;
    }

    let selectedItems = this.selectedItems;
    const multiSelection = !!(event.metaKey || event.ctrlKey);
    if (!element.hasAttribute('selected')) {
      element.setAttribute('selected', 'selected');
      if (multiSelection) {
        selectedItems.push(element);
      } else {
        selectedItems.forEach(item => item.removeAttribute('selected'));
        selectedItems = [element];
      }
    } else {
      if (multiSelection) {
        element.removeAttribute('selected');
        selectedItems = this.selectedItems.filter(
          selectedItem => selectedItem != element
        );
      } else {
        this.selectedItems
          .filter(selectedItem => selectedItem != element)
          .forEach(item => item.removeAttribute('selected'));
        selectedItems = [element];
      }
    }
    this.dispatchEvent(
      new CustomEvent('typo3-grid-selection-changed', { detail: selectedItems })
    );
  };

  _onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        this.selectedItems.forEach(item => item.removeAttribute('selected'));
        this.dispatchEvent(
          new CustomEvent('typo3-grid-selection-changed', { detail: [] })
        );
        event.preventDefault();
        break;
      case 'a':
        if (event.metaKey || event.ctrlKey) {
          this.items.forEach(item => item.setAttribute('selected', 'selected'));

          this.dispatchEvent(
            new CustomEvent('typo3-grid-selection-changed', {
              detail: this.items,
            })
          );
          event.preventDefault();
        }
        break;
      default:
      // do nothing
    }
  };
}
