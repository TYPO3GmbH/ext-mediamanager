import { customElement, LitElement, query, TemplateResult } from 'lit-element';

import styles from './typo3-dropdown.pcss';
import themeStyles from '../../../theme/index.pcss';
import { html } from 'lit-html';
import { Typo3Menu } from '../../menu/src/typo3-menu';

/**
 * @slot - Default menu content
 * @slot button - Trigger for opening menu
 */
@customElement('typo3-dropdown')
export class Typo3Dropdown extends LitElement {
  @query('slot[name="button"]') buttonSlotElement!: HTMLSlotElement | null;

  @query('typo3-menu') typo3Menu!: Typo3Menu;

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html`
      <slot name="button" @click="${this.showDropdownMenu}"></slot>
      <typo3-menu corner="BOTTOM_LEFT">
        <slot></slot>
      </typo3-menu>
    `;
  }

  showDropdownMenu(): void {
    if (this.buttonSlotElement) {
      this.typo3Menu.anchor = this.buttonSlotElement.assignedNodes()[0] as HTMLElement;
    }
    this.typo3Menu.show();
  }
}
