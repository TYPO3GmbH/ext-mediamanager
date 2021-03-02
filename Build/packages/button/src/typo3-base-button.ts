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

import { html, LitElement, property, query, TemplateResult } from 'lit-element';

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export abstract class Typo3BaseButton extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) active = false;

  @property({ type: String }) label = '';

  @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
  iconRight = false;

  @property({ type: Boolean, reflect: true, attribute: 'only-icon' })
  onlyicon = false;

  @property({ type: String, reflect: true }) color: Color = 'default';

  @query('button') buttonElement!: HTMLButtonElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.shadowRoot!.addEventListener(
      'click',
      (event: Event) => {
        if (this.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      true
    );
  }

  render(): TemplateResult {
    return html`
      <button
        id="button"
        class="button"
        .disabled="${this.disabled}"
        aria-label=${this.label}
      >
        ${this.buttonContent}
      </button>
    `;
  }

  focus(options?: FocusOptions): void {
    this.buttonElement.focus(options);
  }

  protected get buttonContent(): TemplateResult[] {
    const icon = html`<slot name="icon"></slot>`;
    const label = html`<div id="label"><slot></slot></div>`;

    const content = [];

    if (this.hasText) {
      content.push(label);
    }

    if (this.hasIcon) {
      this.iconRight ? content.push(icon) : content.unshift(icon);
    }

    return content;
  }

  private get hasText(): boolean {
    return this.textContent ? this.textContent.trim() !== '' : false;
  }

  private get hasIcon(): boolean {
    return !!this.querySelector('[slot="icon"]');
  }
}
