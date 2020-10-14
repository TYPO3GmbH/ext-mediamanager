import { customElement } from 'lit-element';

import style from './typo3-button.pcss';
import { Typo3BaseButton } from './typo3-base-button';

@customElement('typo3-button')
export class Typo3Button extends Typo3BaseButton {
  public static styles = style;
}
