import { customElement, html, LitElement, property } from 'lit-element';

import styles from './typo3-snackbar.pcss';
import themeStyles from '../../../theme/index.pcss';
import { PropertyValues } from 'lit-element/lib/updating-element';
import { SnackbarVariants } from './lib/snackbar-variants';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

/**
 * @cssprop --typo3-snackbar-bottom
 * @cssprop --typo3-snackbar-display
 * @cssprop --typo3-snackbar-left
 * @cssprop --typo3-snackbar-max-width
 * @cssprop --typo3-snackbar-message-margin
 * @cssprop --typo3-snackbar-message-padding
 * @cssprop --typo3-snackbar-opacity
 * @cssprop --typo3-snackbar-padding
 * @cssprop --typo3-snackbar-position
 * @cssprop --typo3-snackbar-right
 * @cssprop --typo3-snackbar-transform
 * @cssprop --typo3-snackbar-transition
 * @cssprop --typo3-snackbar-visible-opacity
 * @cssprop --typo3-snackbar-visible-transform
 * @cssprop --typo3-snackbar-width
 * @cssprop --typo3-snackbar-z-index
 */
@customElement('typo3-snackbar')
export class Typo3Snackbar extends LitElement {
  @property({ type: Number, reflect: true }) messageId!: number;

  @property({ type: Boolean, reflect: true }) visible = false;

  @property({ type: String, reflect: true }) message = '';

  @property({ type: String }) title = '';

  @property({ type: String, reflect: true }) buttonText = 'OK';

  @property({ type: String, reflect: true }) variant: SnackbarVariants =
    SnackbarVariants.default;

  @property({ type: String, reflect: true }) placement: 'left' | 'right' =
    'left';

  @property({ type: Boolean, reflect: true }) dismissible = false;

  @property({ type: String, reflect: true }) duration?: number;

  private timerAutoHide?: number;

  public static styles = [themeStyles, styles];

  render() {
    return html`
      <typo3-alert color="${this.variant}">
        <div class="snackbar__body">
          ${this.title
            ? html`<h4 class="snackbar__title">${this.title}</h4>`
            : html``}
          <p class="snackbar__message">${unsafeHTML(this.message)}</p>
        </div>
        <slot name="footer"></slot>
      </typo3-alert>
    `;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    clearTimeout(this.timerAutoHide);
    if (true === this.visible) {
      if (this.duration) {
        this.timerAutoHide = window.setTimeout(() => {
          this.hideSnackbar();
        }, this.duration);
      }
    }
  }

  hideSnackbar(): void {
    clearTimeout(this.timerAutoHide);
    this.addEventListener('transitionend', this._afterHide);
    this.visible = false;
  }

  _afterHide(): void {
    this.removeEventListener('transitionend', this._afterHide);
    this.dispatchEvent(new CustomEvent('typo3-snackbar-close'));
  }
}
