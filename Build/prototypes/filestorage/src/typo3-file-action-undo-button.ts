import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { Action } from 'redux';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { translate } from './services/translation.service';

@customElement('typo3-file-action-undo-button')
export class Typo3FileActionUndoButton extends connect(store)(LitElement) {
  @property({ type: Object, reflect: true }) undoAction?: Action;

  protected render(): TemplateResult {
    return html`
      <div>
        ${this.undoAction
          ? html` <typo3-button @click="${this._onUndo}"
              >${translate('undo')}</typo3-button
            >`
          : html``}
      </div>
    `;
  }

  _onUndo(): void {
    store.dispatch(this.undoAction!);
    window.dispatchEvent(new CustomEvent('typo3-remove-snackbar'));
  }
}
