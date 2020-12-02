import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import styles from './typo3-draghandler.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 * @slot icon - Icon that appears on the left
 * @slot title - Title for drag handler
 * @slot message - Message for drag handler
 *
 * @cssprop --typo3-draghandler-background-color
 * @cssprop --typo3-draghandler-color
 */
@customElement('typo3-draghandler')
export class Typo3Draghandler extends LitElement {
  public static styles = [themeStyles, styles];

  protected render(): TemplateResult {
    return html`
     <div class="draghandler">
       <div class="draghandler--icon">
        <slot name="icon"></slot>
       </div>
       <div class="draghandler--body">
         <span class="draghandler--title">
           <slot name="title"></slot>
         <div class="draghandler--message">
           <slot name="message"></slot>
         </div>
       </div>
     </div>`;
  }
}
