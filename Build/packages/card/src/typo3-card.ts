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

/**
 * @fires typo3-card-title-rename - Event fired on title rename
 */
@customElement('typo3-card')
export class Typo3Card extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) subtitle = '';

  @property({ type: String, reflect: true }) variant: 'standard' | 'preview' =
    'standard';

  @property({ type: Boolean, reflect: true }) selected = false;

  @property({ type: String, reflect: true }) value?: string;

  @property({ type: Boolean, reflect: true }) titleEditable = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) notSelectable = false;

  @query('.title') titleElement!: HTMLElement;

  public static styles = [themeStyles, styles];

  @internalProperty() inEditMode = false;

  render(): TemplateResult {
    return html`
      <div class="card" ?selected="${this.selected}">
        <div class="image">
          <slot name="image"></slot>
          <slot name="badge"></slot>
        </div>
        <div class="body">
          <div
            class="title"
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
        ${this.selected ? html`<slot name="selected-badge"></slot> ` : html``}
      </div>
    `;
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
      event.stopPropagation();
    }
  }
}
