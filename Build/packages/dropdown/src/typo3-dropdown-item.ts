import { html } from 'lit-html';
import { css, customElement, property, TemplateResult } from 'lit-element';
import { checkmarkIcon } from './assets/checkmark-icon';

import style from './typo3-dropdown-item.scss';
import { Typo3MenuItem } from '../../menu/src/Typo3MenuItem';

@customElement('typo3-dropdown-item')
export class Typo3DropdownItem extends Typo3MenuItem {
  @property({ type: Boolean, reflect: true, attribute: 'display-checkmark' })
  displayCheckmark = true;

  public static styles = style({ css });

  render(): TemplateResult {
    const text = this.renderText();
    const checkmark = this.renderCheckmark();

    return html` ${checkmark} ${text} `;
  }

  protected renderCheckmark(): TemplateResult {
    return html`
      ${this.displayCheckmark
        ? html`<div class="checkmark">
            ${this.selected ? checkmarkIcon : ''}
          </div>`
        : html``}
    `;
  }
}
