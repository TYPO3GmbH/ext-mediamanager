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
  internalProperty,
  LitElement,
  query,
  TemplateResult,
} from 'lit-element';
import { Typo3ContextMenuOption } from './lib/Typo3ContextMenuOption';
import { Typo3Menu } from './typo3-menu';
import './typo3-menu-item';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-context-menu.pcss';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';

interface OpenContextMenuDetail {
  options: { [key: string]: Typo3ContextMenuOption };
  sourceEvent: MouseEvent;
  context: {};
}

/**
 * @fires typo3-context-menu-open - Dispatched when context menu is opened
 * @fires typo3-context-menu-close - Dispatched when context menu is closed
 * @fires typo3-context-menu-item-click - Dispatched when a context menu option is clicked
 */
@customElement('typo3-context-menu')
export class Typo3ContextMenu extends LitElement {
  @internalProperty()
  currentContextMenuDetail: null | OpenContextMenuDetail = null;

  @query('typo3-menu') typo3Menu!: Typo3Menu;

  public static styles = [themeStyles, styles];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'typo3-show-context-menu',
      this._handleShowContextMenu as EventListener
    );
  }

  disconnectedCallback() {
    window.removeEventListener(
      'typo3-show-context-menu',
      this._handleShowContextMenu as EventListener
    );
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html`
      <typo3-menu
        @closed=${this.onClose}
        @selected="${(event: CustomEvent<ActionDetail>) =>
          this.dispatchContextMenuItemClick(event)}"
        >${this.menuContent}</typo3-menu
      >
    `;
  }

  protected get menuContent(): TemplateResult[] {
    if (!this.currentContextMenuDetail) {
      return [html``];
    }

    return Object.values(this.currentContextMenuDetail.options).map(
      (option: Typo3ContextMenuOption) => {
        switch (option.type) {
          case 'divider':
            return html` <li divider></li> `;
          case 'item':
            return html`
              <typo3-menu-item graphic="icon">
                <span slot="icon">${unsafeHTML(option.icon)}</span>
                ${option.label}
              </typo3-menu-item>
            `;
          default:
            return html``;
        }
      }
    );
  }

  onClose(): void {
    const openEvent = new CustomEvent('typo3-context-menu-close');
    this.dispatchEvent(openEvent);
    this.currentContextMenuDetail = null;
  }

  dispatchContextMenuItemClick(event: CustomEvent<ActionDetail>): void {
    const options = Object.values(
      this.currentContextMenuDetail?.options ?? {}
    ).filter(option => option.type !== 'divider');

    const option = options[event.detail.index];

    if (option === undefined) {
      return;
    }

    const actionEvent = new CustomEvent('typo3-context-menu-item-click', {
      detail: {
        option: option,
        context: this.currentContextMenuDetail?.context,
      },
    });
    this.dispatchEvent(actionEvent);
  }

  _handleShowContextMenu = (
    event: CustomEvent<OpenContextMenuDetail>
  ): void => {
    this.currentContextMenuDetail = event.detail;
    const openEvent = new CustomEvent('typo3-context-menu-open');
    this.dispatchEvent(openEvent);

    this.style.position = 'absolute';
    this.style.top = event.detail.sourceEvent.pageY + 'px';
    this.style.left = event.detail.sourceEvent.pageX + 10 + 'px';
    this.typo3Menu.show();
  };
}
