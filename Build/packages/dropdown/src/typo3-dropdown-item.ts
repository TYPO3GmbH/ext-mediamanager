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
