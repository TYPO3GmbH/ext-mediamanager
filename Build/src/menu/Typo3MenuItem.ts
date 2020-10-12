import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import style from './typo3-menu-item.scss';
import { css, html, TemplateResult } from 'lit-element';

export class Typo3MenuItem extends ListItemBase {
  public static styles = style({ css });

  protected renderGraphic(): TemplateResult {
    return html` <slot name="icon"></slot>`;
  }
}
