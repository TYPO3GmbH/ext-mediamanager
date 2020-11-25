import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-files-draghandler.pcss';
import themeStyles from '../../../theme/index.pcss';

// todo use slots for icons & text

/**
 * @cssprop --typo3-draghandler-background-color
 * @cssprop --typo3-draghandler-color
 */
@customElement('typo3-files-draghandler')
export class Typo3FilesDraghandler extends LitElement {
  @property({ type: Number }) numFiles = 0;

  @property({ type: String }) mode: 'copy' | 'move' = 'move';

  public static styles = [themeStyles, styles];

  protected render(): TemplateResult {
    return html`
     <div class="draghandler">
       <div class="draghandler--icon">
         ${
           this.mode == 'copy'
             ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                 <g class="icon-color">
                   <path
                     d="M12.5 2H9.4c-.2-.6-.7-1-1.4-1s-1.2.4-1.4 1H3.5c-.3 0-.5.2-.5.5v12c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5v-12c0-.3-.2-.5-.5-.5zM8 1.8c.4 0 .8.3.8.8s-.4.7-.8.7-.7-.4-.7-.8.3-.7.7-.7zM12 14H4V3h1v.5c0 .3.2.5.5.5h5c.3 0 .5-.2.5-.5V3h1v11z"
                   />
                 </g>
               </svg>`
             : html`<svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="32"
                 height="32"
                 viewBox="0 0 32 32"
               >
                 <path
                   d="M8.8 7.9l6.7-6.7c.2-.1.3-.2.5-.2s.3.1.5.2l6.6 6.7c.1.1.2.2.1.3 0 .1-.1.1-.3.1h-4.3v5.1h5.1V9.1c0-.2 0-.3.1-.3s.2 0 .3.1l6.7 6.6c.1.1.2.3.2.4 0 .2-.1.3-.2.4L24.1 23c-.1.1-.2.2-.3.1s-.1-.1-.1-.3v-4.4h-5.1v5.1h4.3c.2 0 .3 0 .3.1s0 .2-.1.3l-6.6 6.7c-.2.3-.3.4-.5.4s-.3-.1-.5-.2l-6.7-6.7c-.1-.1-.2-.2-.1-.3 0-.1.1-.1.3-.1h4.4v-5.1h-5V23c0 .2 0 .3-.1.3s-.2 0-.3-.1l-6.7-6.7c-.2-.2-.3-.4-.3-.6 0-.2.1-.3.2-.4l6.7-6.6c.1-.1.2-.2.3-.1s.1.1.1.3v4.4h5.1V8.4H9c-.2 0-.3 0-.3-.1-.1-.1 0-.2.1-.4z"
                 />
               </svg>`
         }
       </div>
       <div class="draghandler--body">
         <span class="draghandler--title">${
           this.mode == 'copy' ? 'Copy' : 'Move'
         } ${this.numFiles} Files</span>
         <div class="draghandler--message">
           ${
             this.mode == 'copy'
               ? html`Release &lt;STRG&gt; to move`
               : html`Hold &lt;STRG&gt; to copy`
           }
           </br>Press &lt;ESC&gt; to cancel
           </div>
       </div>
     </div>`;
  }
}
