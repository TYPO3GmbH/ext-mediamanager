import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import style from './typo3-menu-item.scss';
import { css } from 'lit-element';

export class Typo3MenuItem extends ListItemBase {
  public static styles = style({ css });
}
