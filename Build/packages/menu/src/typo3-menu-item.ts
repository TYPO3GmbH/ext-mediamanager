import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import styles from './typo3-menu-item.pcss';
import themeStyles from '../../../theme/index.pcss';
import { customElement, html, TemplateResult } from 'lit-element';

@customElement('typo3-menu-item')
export class Typo3MenuItem extends ListItemBase {
  public static styles = [themeStyles, styles];

  protected renderGraphic(): TemplateResult {
    return html` <slot name="icon"></slot>`;
  }
}
