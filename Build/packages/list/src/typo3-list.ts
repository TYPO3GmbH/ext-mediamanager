import { customElement, html, TemplateResult } from 'lit-element';
import styles from './typo3-list.pcss';
import themeStyles from '../../../theme/index.pcss';
import { ListBase } from '@material/mwc-list/mwc-list-base';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement('typo3-list')
export class Typo3List extends ListBase {
  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    const role = this.innerRole === null ? undefined : this.innerRole;
    const ariaLabel =
      this.innerAriaLabel === null ? undefined : this.innerAriaLabel;
    const tabindex = this.rootTabbable ? '0' : '-1';
    return html`
      <ul
        tabindex=${tabindex}
        role="${ifDefined(role)}"
        aria-label="${ifDefined(ariaLabel)}"
        class="typo3-list mdc-list"
        @keydown=${this.onKeydown}
        @focusin=${this.onFocusIn}
        @focusout=${this.onFocusOut}
        @request-selected=${this.onRequestSelected}
        @list-item-rendered=${this.onListItemConnected}
      >
        <slot></slot>
      </ul>
    `;
  }
}
