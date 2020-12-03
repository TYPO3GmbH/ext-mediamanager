import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { Typo3Modal } from '../../../packages/modal/src/typo3-modal';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-confirm-modal.pcss';

@customElement('typo3-confirm-modal')
export class Typo3ConfirmModal extends LitElement {
  @query('typo3-modal') modal!: Typo3Modal;

  @property({ type: String }) headline = '';

  @property({ type: String }) message = '';

  @property({ type: String }) submitButtonText = '';

  @property({ type: String }) cancelButtonText = '';

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html` <typo3-modal headline="${this.headline}" dismissible>
      <p>${this.message}</p>
      <div class="footer" slot="footer">
        <typo3-button color="danger" @click="${this._onSubmit}"
          >${this.submitButtonText}</typo3-button
        >
        <typo3-button color="default" @click="${() => this.modal.close()}"
          >${this.cancelButtonText}</typo3-button
        >
      </div>
    </typo3-modal>`;
  }

  show(): void {
    this.modal.show();
  }

  _onSubmit(): void {
    const deleteEvent = new CustomEvent('typo3-confirm-submit');
    this.dispatchEvent(deleteEvent);
    this.modal.close();
  }
}
