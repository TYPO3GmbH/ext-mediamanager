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
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-file-action-undo-button.pcss';

@customElement('typo3-file-action-undo-button')
export class Typo3FileActionUndoButton extends connect(store)(LitElement) {
  @property({ type: Object, reflect: true }) undoAction?: Action;

  public static styles = [themeStyles, styles];

  protected render(): TemplateResult {
    if (!this.undoAction) {
      return html``;
    }

    return html`
      <div>
        <typo3-button @click="${this._onUndo}">${translate(
      'undo'
    )}</typo3-button
      </div>
    `;
  }

  _onUndo(): void {
    store.dispatch(this.undoAction!);
    dispatchEvent(new CustomEvent('typo3-remove-snackbar'));
  }
}
