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
import Macy from 'macy';

/**
 * @fires typo3-grid-selection-changed - Dispatched when selection has changed
 */
@customElement('typo3-grid')
export class Typo3Grid extends LitElement {
  public static styles = [themeStyles, styles];

  @query('.grid') grid!: HTMLElement;

  @query('slot') slotElement!: HTMLSlotElement;

  @property({ type: Boolean, reflect: true }) selectable = false;

  private _macy!: Macy;

  render(): TemplateResult {
    return html` <slot name="item" @click="${this._onItemClick}"></slot> `;
  }

  firstUpdated(): void {
    this._macy = Macy({
      container: this,
      trueOrder: true,
      waitForImages: false,
      margin: 24,
      columns: 6,
      breakAt: {
        1200: 5,
        940: 3,
        520: 2,
        400: 1,
      },
      useContainerForBreakpoints: true,
    });

    // todo observe changed content
    this.slotElement.addEventListener('slotchange', e => {
      this.reload();
    });
  }

  reload(): void {
    this._macy.recalculate();
  }

  get items(): HTMLElement[] {
    return this.slotElement!.assignedElements() as HTMLElement[];
  }

  get selectedItems(): HTMLElement[] {
    return this.items.filter(element => element.hasAttribute('selected'));
  }

  _onItemClick = (event: MouseEvent) => {
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
}
