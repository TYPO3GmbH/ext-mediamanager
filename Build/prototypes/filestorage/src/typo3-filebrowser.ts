import { html, LitElement, TemplateResult } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';

export class Typo3Filebrowser extends connect(store)(LitElement) {
  protected get renderNewFolderButton(): TemplateResult {
    return html``;
  }

  protected get renderUploadButton(): TemplateResult {
    return html``;
  }
}
