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
import { Masonry } from '@fristys/masonry';
import { PropertyValues } from 'lit-element/lib/updating-element';

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

  private _masonry!: Masonry;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
  }

  render(): TemplateResult {
    return html` <slot name="item" @click="${this._onItemClick}"></slot> `;
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('hash')) {
      this._masonry.init();
    }
  }

  firstUpdated(): void {
    this.setAttribute('tabIndex', '-1');
    this._masonry = new Masonry(this, {
      useContainerWidth: true,
      columns: 8,
      columnBreakpoints: {
        1800: 7,
        1600: 6,
        1400: 5,
        1200: 4,
        940: 3,
        520: 2,
        400: 1,
      },
      trackItemSizeChanges: true,
    });
  }

  reload(): void {
    this._masonry.init();
  }

  get items(): HTMLElement[] {
    return this.slotElement!.assignedElements() as HTMLElement[];
  }

  get selectedItems(): HTMLElement[] {
    return this.items.filter(element => element.hasAttribute('selected'));
  }

  _onItemClick = (event: MouseEvent) => {
    event.stopPropagation();
    const element = event.target as HTMLElement;
    if (false === this.selectable) {
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
    }
  };
}
