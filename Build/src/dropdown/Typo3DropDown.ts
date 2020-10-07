import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { CSSResultArray } from 'lit-element';
import { dropDownStyles } from './typo3-dropdown-styles';

export class Typo3DropDown extends MenuBase {
  constructor() {
    super();
    this.corner = 'BOTTOM_LEFT';
  }

  static get styles(): CSSResultArray {
    return [dropDownStyles];
  }
}
