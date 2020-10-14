import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import style from './typo3-menu-item.scss';
import { css, customElement, html, TemplateResult } from 'lit-element';

@customElement('typo3-menu-item')
export class Typo3MenuItem extends ListItemBase {
  public static styles = style({ css });

  protected renderGraphic(): TemplateResult {
    return html` <slot name="icon"></slot>`;
  }
}
