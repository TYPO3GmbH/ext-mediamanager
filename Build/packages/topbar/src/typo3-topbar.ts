import {
  css,
  customElement,
  html,
  LitElement,
  TemplateResult,
} from 'lit-element';

import style from './typo3-topbar.scss';

@customElement('typo3-topbar')
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
