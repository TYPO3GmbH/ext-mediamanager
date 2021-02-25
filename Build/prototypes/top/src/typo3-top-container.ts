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
  internalProperty,
  LitElement,
  query,
  TemplateResult,
} from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-top-container.pcss';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import * as fromModal from './redux/ducks/modal';
import * as fromSnackbar from './redux/ducks/snackbar';
import { RootState } from './redux/ducks';
import { SHOW_MODAL_MESSAGE_TYPE } from '../../shared/src/types/message';
import { ShowModalMessage } from '../../shared/src/types/show-modal-message';
import { ModalType } from '../../shared/src/types/modal-data';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Typo3Modal } from '../../../packages/modal/src/typo3-modal';
import {
  SHOW_SNACKBAR_MESSAGE_TYPE,
  ShowSnackbarMessage,
} from '../../shared/src/types/show-snackbar-message';
import { Typo3Snackbar } from '../../../packages/snackbar/src/typo3-snackbar';

@customElement('typo3-top-container')
export class Typo3TopContainer extends connect(store)(LitElement) {
  public static styles = [themeStyles, styles];

  @internalProperty() state!: RootState;

  @query('typo3-modal') modal!: Typo3Modal;
  @query('typo3-snackbar') snackbar!: Typo3Snackbar;

  stateChanged(state: RootState): void {
    this.state = state;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('message', this._handlePostMessage);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this._handlePostMessage);
    super.disconnectedCallback();
  }

  _handlePostMessage = (
    event: MessageEvent<ShowModalMessage | ShowSnackbarMessage>
  ) => {
    switch (event.data.type) {
      case SHOW_MODAL_MESSAGE_TYPE:
        store.dispatch(new fromModal.ShowModal(event.data.data));
        break;
      case SHOW_SNACKBAR_MESSAGE_TYPE:
        store.dispatch(new fromSnackbar.ShowSnackbar(event.data.data));
        break;
    }
  };

  _onModalClose(): void {
    store.dispatch(new fromModal.CloseModal());
  }

  _onModalAction(action: string): void {
    const obj: { [key: string]: string | Blob } = {};
    if (fromModal.getModalData(this.state)?.isForm) {
      const formElement = this.modal.querySelector('form') as HTMLFormElement;
      const formData = new FormData(formElement);
      formData.forEach((value, key) => (obj[key] = value));
    }
    store.dispatch(new fromModal.ModalAction(action, obj));
  }

  protected render(): TemplateResult {
    return html`
      <typo3-modal
        ?open="${this.state.modal.open}"
        @typo3-modal-close="${this._onModalClose}"
        headline="${this.state.modal.data?.headline}"
        variant="${this.state.modal.data?.variant}"
        ?dismissible="${this.state.modal.data?.dismissible}"
      >
        ${this.renderModalContent} ${this.renderModalButtons}
      </typo3-modal>
    `;
  }

  private get renderModalContent(): TemplateResult {
    const modalData = fromModal.getModalData(this.state);
    switch (modalData?.type) {
      case ModalType.HTML:
        return html` ${unsafeHTML(modalData?.content)} `;
      case ModalType.CONFIRM:
        return html`<p>${modalData?.content}</p>`;
      default:
        return html``;
    }
  }

  private get renderModalButtons(): TemplateResult[] {
    return fromModal.getActionButtons(this.state).map(buttonData => {
      return html` <typo3-button
        slot="footer"
        color="${buttonData.color}"
        @click="${() => this._onModalAction(buttonData.action)}"
        >${buttonData.label}</typo3-button
      >`;
    });
  }
}
