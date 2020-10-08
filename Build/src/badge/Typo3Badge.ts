import { css, html, LitElement, property, TemplateResult, } from 'lit-element';

// @ts-ignore
import style from './typo3-badge.scss';

export class Typo3Badge extends LitElement {
  @property({ type: String }) title = '';

  public static styles = style({ css });


  render(): TemplateResult {
    return html` ${this.title} `;
  }
}
