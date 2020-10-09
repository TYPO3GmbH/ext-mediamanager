import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import style from '../alert/typo3-alert.scss';
import { Color } from '../badge/Typo3Badge';

export class Typo3Alert extends LitElement {
  @property({ type: String, reflect: true }) color: Color = 'default';

  public static styles = style({ css });

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
