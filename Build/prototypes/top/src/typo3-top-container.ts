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

@customElement('typo3-top-container')
export class Typo3TopContainer extends connect(store)(LitElement) {
  @internalProperty() state!: RootState;

  @query('typo3-modal') modal!: Typo3Modal;

  public static styles = [themeStyles, styles];

  stateChanged(state: RootState): void {
    this.state = state;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('message', this._handlePostMessage);
    // todo: use em/adjust rems or wait for bootstrap 4
    // bootstrap 3 defines 10px as base unit via html {font-size: 10px;}
    // use 16px as base unit to make sure elements have the correct size
    window.document.documentElement.style.fontSize = '16px';
  }

  disconnectedCallback() {
    window.removeEventListener('message', this._handlePostMessage);
    super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    return html`
      <typo3-modal
        ?open="${this.state.modal.open}"
        @typo3-modal-close="${this._onModalClose}"
        headline="${this.state.modal.data?.headline}"
      >
        ${this.renderModalContent} ${this.renderModalButtons}
      </typo3-modal>
      <typo3-snackbar
        ?visible="${this.state.snackbar.open}"
        placement="right"
        title="${this.state.snackbar.data?.title}"
        message="${this.state.snackbar.data?.message}"
        variant="${this.state.snackbar.data?.variant}"
        duration="${this.state.snackbar.data?.duration}"
        @typo3-snackbar-close="${this._onSnackbarClose}"
      ></typo3-snackbar>
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
        @click="${() => this._onModalConfirm(buttonData.action)}"
        >${buttonData.label}</typo3-button
      >`;
    });
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

  _onModalConfirm(action: string): void {
    const obj: { [key: string]: string | Blob } = {};
    if (fromModal.getModalData(this.state)?.isForm) {
      const formElement = this.modal.querySelector('form') as HTMLFormElement;
      const formData = new FormData(formElement);
      formData.forEach((value, key) => (obj[key] = value));
    }

    store.dispatch(new fromModal.ModalAction(action, obj));
  }

  _onSnackbarClose(): void {
    store.dispatch(new fromSnackbar.CloseSnackbar());
  }
}
