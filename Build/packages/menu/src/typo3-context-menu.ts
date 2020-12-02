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

interface OpenContextMenuDetail {
  options: { [key: string]: Typo3ContextMenuOption };
  sourceEvent: MouseEvent;
  contextItem: {};
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
      <typo3-menu @closed=${this.onClose}> ${this.menuContent}</typo3-menu>
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
              <typo3-menu-item
                graphic="icon"
                @click="${() => this.dispatchContextMenuItemClick(option)}"
              >
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

  dispatchContextMenuItemClick(option: Typo3ContextMenuOption): void {
    const actionEvent = new CustomEvent('typo3-context-menu-item-click', {
      detail: {
        option: option,
        contextItem: this.currentContextMenuDetail?.contextItem,
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
