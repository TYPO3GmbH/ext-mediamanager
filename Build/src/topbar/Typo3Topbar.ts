import { CSSResultArray, html, LitElement, TemplateResult } from 'lit-element';
import { topbarStyles } from './typo3-topbar-styles';

export class Typo3Topbar extends LitElement {
  static get styles(): CSSResultArray {
    return [topbarStyles];
  }

  render(): TemplateResult {
    return html`
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    `;
  }
}
