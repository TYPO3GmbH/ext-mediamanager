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
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

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
  public static styles = [themeStyles, styles];

  @property({ type: Boolean, reflect: true }) multi = false;

  @query('slot[name="button"]') buttonSlotElement!: HTMLSlotElement | null;
  @query('typo3-menu') typo3Menu!: Typo3Menu;

  render(): TemplateResult {
    return html`
      <slot name="button" @click="${this.showDropdownMenu}"></slot>
      <typo3-menu
        corner="BOTTOM_LEFT"
        fixed="true"
        ?multi="${this.multi}"
        ?forceGroupSelection="${this.multi}"
        @typo3-menu-open="${this.onMenuOpen}"
        @typo3-menu-close="${this.onMenuClose}"
      >
        <slot></slot>
      </typo3-menu>
    `;
  }

  showDropdownMenu(): void {
    if (this.buttonElement) {
      this.typo3Menu.anchor = this.buttonElement;
    }
    this.typo3Menu.show();
  }

  onMenuOpen(): void {
    this.buttonElement?.setAttribute('active', '');
  }

  onMenuClose(): void {
    this.buttonElement?.removeAttribute('active');
  }

  get buttonElement(): HTMLElement | null {
    if (this.buttonSlotElement) {
      return this.buttonSlotElement.assignedNodes()[0] as HTMLElement;
    }
    return null;
  }
}
