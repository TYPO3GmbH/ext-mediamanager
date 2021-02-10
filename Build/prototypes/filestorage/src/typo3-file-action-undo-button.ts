/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

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
  public static styles = [themeStyles, styles];

  @property({ type: Object, reflect: true }) undoAction?: Action;

  render(): TemplateResult {
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
