import {
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
} from 'lit-element';

import styles from './typo3-snackbar.pcss';
import themeStyles from '../../../theme/index.pcss';
import { PropertyValues } from 'lit-element/lib/updating-element';
import { SnackbarValues } from './lib/snackbar-values';
import { SnackbarVariants } from './lib/snackbar-variants';

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
  @property({ type: Boolean, reflect: true }) visible = false;

  @property({ type: String, reflect: true }) message: string | null = null;

  @property({ type: String, reflect: true }) messageTitle: string | null = null;

  @property({ type: String, reflect: true }) buttonText: string | null = null;

  @property({ type: String, reflect: true }) variant: SnackbarVariants =
    'default';

  @property({ type: String, reflect: true }) placement: 'left' | 'right' =
    'left';

  @property({ type: Boolean, reflect: true }) dismissible = false;

  @internalProperty() cue: SnackbarValues[] = [];

  private _animationStart!: number;
  private _duration!: number | null;

  public static styles = [themeStyles, styles];

  render() {
    return html`
      <typo3-alert
        color="${this.variant}"
        style="--typo3-alert-margin-bottom:0;"
      >
        <div class="snackbar__body">
          ${this.messageTitle
            ? html`<h4 class="snackbar__title">${this.messageTitle}</h4>`
            : html``}
          <p class="snackbar__message">${this.message}</p>
        </div>
        ${this.dismissible
          ? html`<typo3-button
              color="${this.variant}"
              class="snackbar__button"
              @click="${this._handleButtonClick}"
              >${this.buttonText}</typo3-button
            >`
          : html``}
      </typo3-alert>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('typo3-add-snackbar', this._removeHiddenState, {
      once: true,
    });
    window.addEventListener(
      'typo3-add-snackbar',
      this._handleAddSnackbar as EventListener
    );
    this._timer = this._timer.bind(this);
  }

  disconnectedCallback() {
    window.removeEventListener('typo3-add-snackbar', this._removeHiddenState);
    window.removeEventListener(
      'typo3-add-snackbar',
      this._handleAddSnackbar as EventListener
    );
    super.disconnectedCallback();
  }

  updated(_changedProperties: PropertyValues): void {
    super.update(_changedProperties);
    if (!_changedProperties.has('cue')) {
      return;
    }
    if (this.cue.length === 0) {
      this._resetVisibleValues();
      return;
    }

    if (this.cue.length > 0) {
      this._showSnackbar(this.cue[0]);
    }
  }

  _handleAddSnackbar = (event: CustomEvent): void => {
    this.cue = [...this.cue, Object.assign(new SnackbarValues(), event.detail)];
  };

  _handleButtonClick(): void {
    this._hideSnackbar();
  }

  _hideSnackbar(): void {
    this.visible = false;
    this.addEventListener('transitionend', this._afterHide);
  }

  _afterHide(): void {
    this.cue = this.cue.slice(1);
    this.removeEventListener('transitionend', this._afterHide);
  }

  _resetVisibleValues(): void {
    this.message = null;
    this.buttonText = null;
  }

  _showSnackbar(snackbar: SnackbarValues): void {
    setTimeout(() => {
      this._setSnackbarValues(snackbar);
      if (this.cue[0].duration !== null) {
        this._animationStart = Date.now();
        this._timer();
      }
      this.visible = true;
    });
  }

  _removeHiddenState = (): void => {
    this.removeAttribute('hidden');
  };

  _timer(): void {
    const rightNow = Date.now();
    if (rightNow - this._animationStart >= (this._duration || 0)) {
      this._hideSnackbar();
      cancelAnimationFrame(this._timer);
    } else {
      requestAnimationFrame(this._timer);
    }
  }

  _setSnackbarValues(element: SnackbarValues) {
    this.message = element.message;
    this.messageTitle = element.title;

    this.dismissible = element.dismissible;
    this._duration = element.duration;
    this.variant = element.variant;
    this.buttonText = element.buttonText;
  }
}
