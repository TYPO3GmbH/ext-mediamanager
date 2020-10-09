import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html } from 'lit-html';
import { css, property, TemplateResult } from 'lit-element';
import { checkmarkIcon } from '../shared/icons/checkmark-icon';

import style from './typo3-dropdown-item.scss';

export class Typo3DropDownItem extends ListItemBase {
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
