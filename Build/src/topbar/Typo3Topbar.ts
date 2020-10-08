import { css, html, LitElement, TemplateResult } from 'lit-element';

import style from './typo3-topbar.scss';

export class Typo3Topbar extends LitElement {
  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    `;
  }
}
