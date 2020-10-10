import { Typo3Button } from './Typo3Button';
import { css } from 'lit-element';

import style from './typo3-dropdown-button.scss';

export class Typo3DropdownButton extends Typo3Button {
  constructor() {
    super();
    this.color = 'secondary';
  }

  public static styles = style({ css });
}
