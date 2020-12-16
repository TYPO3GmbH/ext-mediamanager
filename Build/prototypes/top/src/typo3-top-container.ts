import { customElement, html, internalProperty, LitElement, query, TemplateResult, } from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-top-container.pcss';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import * as fromModal from './redux/ducks/modal';
import { RootState } from './redux/ducks';
import { SHOW_MODAL_MESSAGE_TYPE } from '../../shared/types/message';
import { ShowModalMessage } from '../../shared/types/show-modal-message';
import { ModalType } from '../../shared/types/modal-data';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Typo3Modal } from '../../../packages/modal/src/typo3-modal';

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
        ${this.renderModalContent}
        ${this.renderModalButtons}
      </typo3-modal>
    `;
  }

  private get renderModalContent(): TemplateResult {
    const modalData = fromModal.getModalData(this.state);
    switch (modalData?.type) {
      case ModalType.HTML:
        return html ` ${unsafeHTML(modalData?.content)} `;
      case ModalType.CONFIRM:
        return html `<p>${modalData?.content}</p>`;
      default:
        return html ``;
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

  _handlePostMessage = (event: MessageEvent<ShowModalMessage>) => {
    switch (event.data.type) {
      case SHOW_MODAL_MESSAGE_TYPE:
        store.dispatch(new fromModal.ShowModal(event.data.data));
    }
  };

  _onModalClose(): void {
    store.dispatch(new fromModal.CloseModal());
  }

  _onModalConfirm(action: string): void {
    let data = {};
    if (fromModal.getModalData(this.state)?.isForm) {
      const formElement = this.modal.querySelector('form') as HTMLFormElement;
      data = new FormData(formElement);
      var obj = {};
      for (var key of data.keys()) {
        obj[key] = data.get(key);
      }
    }

    store.dispatch(new fromModal.ModalAction(action, obj));
  }
}
