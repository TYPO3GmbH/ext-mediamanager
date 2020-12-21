import { customElement, html, TemplateResult } from 'lit-element';
import { Typo3Filestorage } from './typo3-filestorage';

@customElement('typo3-filebrowser')
export class Typo3Filebrowser extends Typo3Filestorage {
  protected get renderNewFolderButton(): TemplateResult {
    return html``;
  }

  protected get renderUploadButton(): TemplateResult {
    return html``;
  }
}
