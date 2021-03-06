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
  TemplateResult,
} from 'lit-element';

import styles from './typo3-dropzone.pcss';
import themeStyles from '../../../theme/index.pcss';
import { isEqual } from 'lodash-es';

export type DropEffects = 'copy' | 'move' | 'link' | 'none';

@customElement('typo3-dropzone')
export class Typo3Dropzone extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: Boolean, reflect: true, attribute: 'dragged' })
  public isDragged = false;

  @property({ type: Boolean, reflect: true, attribute: 'drop-allowed' })
  public dropAllowed = true;

  private debouncedDragLeave: number | null = null;

  private _dropEffect: DropEffects = 'copy';

  public get dropEffect(): DropEffects {
    return this._dropEffect;
  }

  public set dropEffect(value: DropEffects) {
    if (['copy', 'move', 'link', 'none'].includes(value)) {
      this._dropEffect = value;
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('drop', this.onDrop);
    this.addEventListener('dragover', this.onDragOver);
    this.addEventListener('dragleave', this.onDragLeave);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('drop', this.onDrop);
    this.removeEventListener('dragover', this.onDragOver);
    this.removeEventListener('dragleave', this.onDragLeave);
  }

  public onDragOver(event: DragEvent): void {
    const shouldAcceptEvent = new CustomEvent('typo3-dropzone-should-accept', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: event,
    });
    // dispatch event returns true if preventDefault() is not called
    this.dropAllowed = !!this.dispatchEvent(shouldAcceptEvent);

    if (!event.dataTransfer || !isEqual(['Files'], event.dataTransfer.types)) {
      return;
    }

    this.dropEffect = this.dropAllowed ? 'copy' : 'none';

    event.preventDefault();

    this.clearDebouncedDragLeave();

    this.isDragged = true;

    event.dataTransfer.dropEffect = this.dropEffect;
    const dragOverEvent = new CustomEvent('typo3-dropzone-dragover', {
      bubbles: true,
      composed: true,
      detail: event,
    });
    this.dispatchEvent(dragOverEvent);
  }

  public onDragLeave(event: DragEvent): void {
    this.clearDebouncedDragLeave();

    this.debouncedDragLeave = window.setTimeout(() => {
      this.isDragged = false;

      const dragLeave = new CustomEvent('typo3-dropzone-dragleave', {
        bubbles: true,
        composed: true,
        detail: event,
      });
      this.dispatchEvent(dragLeave);
    }, 100);
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = false;

    if (false === this.dropAllowed) {
      return;
    }

    const dropEvent = new CustomEvent('typo3-dropzone-drop', {
      bubbles: true,
      composed: true,
      detail: event,
    });
    this.dispatchEvent(dropEvent);
  }

  protected render(): TemplateResult {
    return html`
      ${this.isDragged
        ? html` <div class="message">
              ${this.dropAllowed
                ? html`<slot name="allowed-drop-message"></slot>`
                : html`<slot name="denied-drop-message"></slot>`}
            </div>
            <typo3-overlay></typo3-overlay>`
        : html``}
      <slot></slot>
    `;
  }

  protected clearDebouncedDragLeave(): void {
    if (this.debouncedDragLeave) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }
}
