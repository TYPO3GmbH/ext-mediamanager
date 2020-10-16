import { html } from 'lit-html';
import { customElement, property, TemplateResult } from 'lit-element';
import { checkmarkIcon } from './assets/checkmark-icon';

import styles from './typo3-dropdown-item.pcss';
import { Typo3ListItemBase } from '../../list/src/typo3-list-item-base';

@customElement('typo3-dropdown-item')
export class Typo3DropdownItem extends Typo3ListItemBase {
  @property({ type: Boolean, reflect: true, attribute: 'display-checkmark' })
  displayCheckmark = true;

  public static styles = [...Typo3ListItemBase.styles, styles];

  render(): TemplateResult {
    return html`
      ${this.displayCheckmark
        ? html`<div class="checkmark">
            ${this.selected ? checkmarkIcon : ''}
          </div>`
        : html``}
      ${super.render()}
    `;
  }
}
