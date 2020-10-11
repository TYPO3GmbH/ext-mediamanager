import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { css } from 'lit-element';

import style from './typo3-dropdown.scss';

export class Typo3DropDown extends MenuBase {
  constructor() {
    super();
    this.corner = 'BOTTOM_LEFT';
  }

  public static styles = style({ css });
}
