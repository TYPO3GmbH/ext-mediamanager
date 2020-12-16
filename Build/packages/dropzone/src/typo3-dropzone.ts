import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-dropzone.pcss';
import themeStyles from '../../../theme/index.pcss';
export type DropEffects = 'copy' | 'move' | 'link' | 'none';

@customElement('typo3-dropzone')
export class Typo3Dropzone extends LitElement {
  public static styles = [themeStyles, styles];

  private _dropEffect: DropEffects = 'copy';

  public get dropEffect(): DropEffects {
    return this._dropEffect;
  }

  public set dropEffect(value: DropEffects) {
    if (['copy', 'move', 'link', 'none'].includes(value)) {
      this._dropEffect = value;
    }
  }

  @property({ type: Boolean, reflect: true, attribute: 'dragged' })
  public isDragged = false;

  @property({ type: Boolean, reflect: true, attribute: 'drop-allowed' })
  public dropAllowed = true;

  private debouncedDragLeave: number | null = null;

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

    if (!event.dataTransfer || 0 === event.dataTransfer.files.length) {
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
