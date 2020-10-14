import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import style from './typo3-topbar.pcss';

@customElement('typo3-topbar')
export class Typo3Topbar extends LitElement {
  public static styles = style;

  render(): TemplateResult {
    return html`
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    `;
  }
}
