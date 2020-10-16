import { PropertyValues } from 'lit-element/lib/updating-element';
import {
  customElement,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { Typo3ContextMenuOption } from './lib/Typo3ContextMenuOption';
import { Typo3Menu } from './typo3-menu';
import './typo3-menu-item';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

/**
 * @todo handle icon values from typo3 backend e.g. icon: "<span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete" data-identifier="actions-edit-delete">↵	<span class="icon-markup">↵<img packages="/typo3/sysext/core/Resources/Public/Icons/T3Icons/actions/actions-edit-delete.svg" width="16" height="16" alt="" />↵	</span>↵	↵</span>"
 *
 * @fires typo3-context-menu-open - Dispatched when context menu is opened
 * @fires typo3-context-menu-close - Dispatched when context menu is closed
 * @fires typo3-context-menu-item-click - Dispatched when a context menu option is clicked
 */
@customElement('typo3-context-menu')
export class Typo3ContextMenu extends LitElement {
  @property({ type: Object }) anchor: HTMLElement | null = null;

  @property({ type: Object }) options: {
    [key: string]: Typo3ContextMenuOption;
  } = {};

  @query('typo3-menu') typo3Menu!: Typo3Menu;

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('anchor')) {
      this.anchor?.addEventListener('contextmenu', event =>
        this.onAnchorContextMenu(event)
      );
      this.anchor?.removeEventListener('contextmenu', event =>
        this.onAnchorContextMenu(event)
      );
    }
  }

  render(): TemplateResult {
    return html`
      <typo3-menu @closed=${this.onClose}> ${this.menuContent} </typo3-menu>
    `;
  }

  protected get menuContent(): TemplateResult[] {
    return Object.values(this.options).map((option: Typo3ContextMenuOption) => {
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
    });
  }

  onClose(): void {
    const openEvent = new CustomEvent('typo3-context-menu-close');
    this.dispatchEvent(openEvent);
  }

  onAnchorContextMenu(event: MouseEvent): void {
    // prevent browser context menu to be displayed
    event.preventDefault();
    event.stopImmediatePropagation();

    const openEvent = new CustomEvent('typo3-context-menu-open');
    this.dispatchEvent(openEvent);

    this.typo3Menu.absolute = true;
    this.typo3Menu.anchor = this.anchor;
    this.typo3Menu.x = event.x;
    this.typo3Menu.y = event.y;
    this.typo3Menu?.show();
  }

  dispatchContextMenuItemClick(option: Typo3ContextMenuOption): void {
    const actionEvent = new CustomEvent('typo3-context-menu-item-click', {
      detail: option,
    });
    this.dispatchEvent(actionEvent);
  }
}
