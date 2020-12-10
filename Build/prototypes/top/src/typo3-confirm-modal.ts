import { customElement, html, property, TemplateResult } from 'lit-element';
import { Typo3Modal } from '../../../packages/modal/src/typo3-modal';
import styles from './typo3-confirm-modal.pcss';

@customElement('typo3-confirm-modal')
export class Typo3ConfirmModal extends Typo3Modal {
  @property({ type: String }) headline = '';

  @property({ type: String }) message = '';

  @property({ type: String }) submitButtonText = '';

  @property({ type: String }) cancelButtonText = '';

  public static styles = [...Typo3Modal.styles, styles];

  get footerContent(): TemplateResult {
    return html`
      <typo3-button color="danger" @click="${this._onSubmit}"
        >${this.submitButtonText}</typo3-button
      >
      <typo3-button color="default" @click="${() => this.close()}"
        >${this.cancelButtonText}</typo3-button
      >
    `;
  }

  get messageContent(): TemplateResult {
    return html`<p>${this.message}</p>`;
  }

  _onSubmit(): void {
    const deleteEvent = new CustomEvent('typo3-confirm-submit');
    this.dispatchEvent(deleteEvent);
    this.close();
  }
}
