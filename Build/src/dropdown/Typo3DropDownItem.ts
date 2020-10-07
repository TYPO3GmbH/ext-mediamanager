import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { dropDownItemStyles } from './typo3-dropdown-item-styles';
import { html } from 'lit-html';
import { CSSResultArray, property, TemplateResult } from 'lit-element';
import { checkmarkIcon } from '../shared/icons/checkmark-icon';

export class Typo3DropDownItem extends ListItemBase {
  @property({ type: Boolean, reflect: true, attribute: 'display-checkmark' })
  displayCheckmark = true;

  static get styles(): CSSResultArray {
    return [dropDownItemStyles];
  }

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
