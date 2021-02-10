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
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-formfield.pcss';

/**
 * @cssprop --typo3-formfield-line-height
 * @cssprop --typo3-formfield-padding
 * @cssprop --typo3-formfield-label-input-gap
 * @cssprop --typo3-formfield-input-padding
 * @cssprop --typo3-formfield-input-color
 * @cssprop --typo3-formfield-input-border-width
 * @cssprop --typo3-formfield-input-border-color
 * @cssprop --typo3-formfield-input-border-radius
 *
 * @slot - Form element
 */
@customElement('typo3-formfield')
export class Typo3Formfield extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: String })
  public label = '';

  @property({ type: String, attribute: 'label-align', reflect: true })
  public labelAlign: 'right' | 'left' | 'top' = 'top';

  @query('slot') protected slotEl!: HTMLSlotElement;

  protected render(): TemplateResult {
    return html` <div class="form-field">
      <label class="form-field__label" @click="${this._onLabelClick}"
        >${this.label}</label
      >
      <slot></slot>
    </div>`;
  }

  private _onLabelClick(): void {
    this.input?.focus();
    this.input?.click();
  }

  protected get input(): HTMLElement | null {
    const firstNode = this.slotEl
      .assignedNodes({ flatten: true })
      .find(node => node.nodeType === Node.ELEMENT_NODE);

    return (firstNode as HTMLElement) ?? null;
  }
}
