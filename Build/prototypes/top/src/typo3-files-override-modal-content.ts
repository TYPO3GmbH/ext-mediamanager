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
  property,
  TemplateResult,
} from 'lit-element';
import { ConflictFileDto } from '../../shared/src/types/conflict-file-dto';
import { FileSizeHelper } from '../../shared/src/lib/file-size-helper';
import { DateHelper } from '../../shared/src/lib/date-helper';

@customElement('typo3-files-override-modal-content')
export class Typo3FilesOverrideModalContent extends LitElement {
  @internalProperty() isBulkAction = false;

  @property({ type: Object }) files: ConflictFileDto[] = [];

  createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  protected render(): TemplateResult {
    return html`
      <form>
        <div>
          <p>${this.trans('file_upload.existingfiles.description')}</p>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>${this.trans('file_upload.header.originalFile')}</th>
                <th>${this.trans('file_upload.header.uploadedFile')}</th>
                <th>${this.trans('file_upload.header.action')}</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderFilesTableRows}
            </tbody>
          </table>
        </div>
        <typo3-formfield
          style="width: 100%"
          label="${this.trans('file_upload.actions.all.label')}"
        >
          <select
            class="form-control t3js-actions-all"
            name="data[all]"
            @change="${this.onBulkActionChange}"
          >
            <option value="">
              ${this.trans('file_upload.actions.all.empty')}
            </option>
            <option value="cancel">
              ${this.trans('file_upload.actions.all.skip')}
            </option>
            <option value="rename">
              ${this.trans('file_upload.actions.all.rename')}
            </option>
            <option value="replace">
              ${this.trans('file_upload.actions.all.override')}
            </option>
          </select>
        </typo3-formfield>
      </form>
    `;
  }

  protected get renderFilesTableRows(): TemplateResult[] {
    return this.files.map(
      file => html`
        <tr>
          <td><img src="${file.original.thumbUrl}" style="height: 40px;" /></td>
          <td>
            ${file.original.name}
            (${FileSizeHelper.formatFileSize(file.original.size)})<br />
            ${DateHelper.formatDate(file.original.mtime * 1000)}
          </td>
          <td>
            ${file.data.name}
            (${FileSizeHelper.formatFileSize(file.data.size)})<br />
            ${DateHelper.formatDate(file.data.lastModified)}
          </td>
          <td>
            <typo3-formfield>
              <select
                class="form-control t3js-actions"
                ?disabled="${this.isBulkAction}"
                name="data[file][${file.data.name}]"
              >
                <option value="cancel">
                  ${this.trans('file_upload.actions.skip')}
                </option>
                <option value="rename">
                  ${this.trans('file_upload.actions.rename')}
                </option>
                <option value="replace">
                  ${this.trans('file_upload.actions.override')}
                </option>
              </select>
            </typo3-formfield>
          </td>
        </tr>
      `
    );
  }

  protected onBulkActionChange(event: Event): void {
    const inputElement = event.target as HTMLSelectElement;
    const bulkActionValue = inputElement.value;
    if (bulkActionValue === '') {
      this.isBulkAction = false;
      return;
    }
    this.isBulkAction = true;

    this.querySelectorAll<HTMLSelectElement>('.t3js-actions').forEach(
      element => (element.value = bulkActionValue)
    );
  }

  protected trans(key: string): string {
    // @ts-ignore
    return '' + window.TYPO3.lang[key];
  }
}
