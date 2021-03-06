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
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-card.pcss';
import themeStyles from '../../../theme/index.pcss';
import { classMap } from 'lit-html/directives/class-map';

/**
 * @fires typo3-card-title-rename - Event fired on title rename
 */
@customElement('typo3-card')
export class Typo3Card extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: String, reflect: true }) variant:
    | 'file'
    | 'folder'
    | 'preview' = 'file';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: String, reflect: true }) value?: string;
  @property({ type: Boolean, reflect: true }) titleEditable = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) notSelectable = false;
  @property({ type: Number, reflect: true }) tabindex = -1;

  @internalProperty() inEditMode = false;

  @query('.title') titleElement!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
  }

  render(): TemplateResult {
    return html`
      <div class="image">
        <slot name="image"></slot>
        <slot name="badge"></slot>
      </div>
      <div class="body">
        <div
          class=${classMap({
            title: true,
            edit: this.inEditMode,
          })}
          ?contentEditable="${this.titleEditable}"
          @click="${this._onClick}"
          @dblclick="${this._onDblclick}"
          @blur="${() => this._onBlur()}"
          @keydown="${this._onKeyDown}"
        >
          ${this.title}
        </div>
        <div class="subtitle">${this.subtitle}</div>
      </div>
      ${this.renderCheckbox}
    `;
  }

  get renderCheckbox(): TemplateResult {
    if (false === this.hasCheckboxSlot) {
      return html``;
    }

    if (true === this.notSelectable) {
      return html``;
    }

    return html`
      <button aria-label="Select" class="checkbox-button" tabindex="-1">
        <span class="icon-actions-checkbox" aria-hidden="true">
          <slot name="checkbox"></slot>
        </span>
      </button>
    `;
  }

  private get hasCheckboxSlot(): boolean {
    return !!this.querySelector('[slot="checkbox"]');
  }

  _onClick(event: MouseEvent): void {
    if (this.titleEditable) {
      this.inEditMode = true;
      event.stopImmediatePropagation();
    }
  }

  _onDblclick(event: MouseEvent): void {
    if (this.inEditMode) {
      event.stopImmediatePropagation();
    }
  }

  _onBlur(skipChangeEvent = false): void {
    if (this.inEditMode) {
      this.inEditMode = false;
      const newTitle = this.titleElement.innerText.trim();
      this.titleElement.innerHTML = this.title;

      if (skipChangeEvent || newTitle === this.title) {
        this.titleElement.blur();
        return;
      }

      this.dispatchEvent(
        new CustomEvent('typo3-card-title-rename', {
          detail: newTitle,
        })
      );
    }
  }

  _onKeyDown(event: KeyboardEvent): void {
    if (['Enter', 'Tab', 'Escape'].indexOf(event.key) !== -1) {
      this._onBlur(event.key === 'Escape');
    }
    if (this.inEditMode) {
      event.stopPropagation();
    }
  }
}
