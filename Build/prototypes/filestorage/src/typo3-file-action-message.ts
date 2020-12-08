import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { Action } from 'redux';
import { SnackbarVariants } from '../../../packages/snackbar/src/lib/snackbar-variants';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { translate } from './services/translation.service';

@customElement('typo3-file-action-message')
export class Typo3FileActionMessage extends connect(store)(LitElement) {
  @property({ type: String, reflect: true }) message?: string;

  @property({ type: Object, reflect: true }) undoAction?: Action;

  @property({ type: Array }) flashMessages?: {}[];

  @property({ type: String, reflect: true }) variant: SnackbarVariants =
    SnackbarVariants.default;

  protected render(): TemplateResult {
    return html`
      <div>
        ${this.message}
        ${this.undoAction
          ? html` <typo3-button @click="${this._onUndo}"
              >${translate('undo')}</typo3-button
            >`
          : html``}
      </div>
    `;
  }

  _onUndo(): void {
    console.log(this.undoAction);
    store.dispatch(this.undoAction!);
  }
}
