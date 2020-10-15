import { customElement } from 'lit-element';

import styles from './typo3-dropdown-button.pcss';
import defaultButtonStyles from './typo3-button.pcss';

import themeStyles from '../../../theme/index.pcss';
import { Typo3BaseButton } from './typo3-base-button';

@customElement('typo3-dropdown-button')
export class Typo3DropdownButton extends Typo3BaseButton {
  constructor() {
    super();
    this.color = 'secondary';
  }

  public static styles = [themeStyles, defaultButtonStyles, styles];
}
