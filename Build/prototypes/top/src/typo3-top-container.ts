import {
  customElement,
  html,
  internalProperty,
  LitElement,
  TemplateResult,
} from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-top-container.pcss';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import * as fromModal from './redux/ducks/modal';
import { RootState } from './redux/ducks';
import { MessageData } from '../../shared/types/message-data';
import { ConfirmModalData } from '../../shared/types/confirm-modal-data';

@customElement('typo3-top-container')
export class Typo3TopContainer extends connect(store)(LitElement) {
  private currentMessageTarget!: MessageEventSource | null;
  private currentMessageOrigin!: string;

  @internalProperty() state!: RootState;

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
      <typo3-confirm-modal
        ?open="${this.state.modal.open}"
        @typo3-modal-close="${this._onModalClose}"
        @typo3-confirm-submit="${this._onModalConfirm}"
        headline="${this.state.modal.data?.headline}"
        submitButtonText="${this.state.modal.data?.submitButtonText}"
        cancelbuttonText="${this.state.modal.data?.cancelButtonText}"
        message="${this.state.modal.data?.message}"
      >
      </typo3-confirm-modal>
    `;
  }

  _handlePostMessage = (event: MessageEvent<MessageData>) => {
    switch (event.data.type) {
      case 'typo3-enable-tree-toggle-button':
        this._enableTreeToggleButton(event);
        break;
      case 'typo3-show-modal':
        this._showConfirmModal(event);
    }
  };

  _enableTreeToggleButton(messageEvent: MessageEvent): void {
    const button = this._getToggleButton();

    button.removeAttribute('disabled');
    this.currentMessageTarget = messageEvent.source;
    this.currentMessageOrigin = (this
      .currentMessageTarget as Window).location.href;

    button.addEventListener('click', this._handleTreeToggleButtonClick, true);
    button.querySelector('.icon-overlay-readonly')?.remove();
  }

  _handleTreeToggleButtonClick = (event: MouseEvent): void => {
    const target = this.currentMessageTarget as Window;

    // remove click handler if location has changed
    if (target.location.href !== this.currentMessageOrigin) {
      const button = this._getToggleButton();
      button.removeEventListener(
        'click',
        this._handleTreeToggleButtonClick,
        true
      );
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    const scaffold = document.querySelector('.scaffold') as HTMLElement;
    scaffold.classList.remove('scaffold-content-navigation-expanded');

    target.postMessage(
      new MessageData('typo3-tree-toggle'),
      this.currentMessageOrigin
    );
  };

  _showConfirmModal(event: MessageEvent<MessageData<ConfirmModalData>>): void {
    const modalData = event.data.detail as ConfirmModalData;
    store.dispatch(new fromModal.ShowModal(modalData));
  }

  _getToggleButton(): HTMLElement {
    return document.querySelector(
      '.topbar-button-navigationcomponent'
    ) as HTMLButtonElement;
  }

  _onModalClose(): void {
    store.dispatch(new fromModal.CloseModal());
  }

  _onModalConfirm(): void {
    store.dispatch(new fromModal.ConfirmModal());
  }
}
