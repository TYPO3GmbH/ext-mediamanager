import { customElement } from 'lit-element';

import style from './typo3-dropdown-button.pcss';
import { Typo3BaseButton } from './typo3-base-button';

@customElement('typo3-dropdown-button')
export class Typo3DropdownButton extends Typo3BaseButton {
  constructor() {
    super();
    this.color = 'secondary';
  }

  public static styles = style;
}
