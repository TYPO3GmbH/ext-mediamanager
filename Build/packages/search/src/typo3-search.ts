import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-search.pcss';

/**
 * @cssprop --typo3-search-height
 * @cssprop --typo3-search-width
 * @cssprop --typo3-search-input-color
 * @cssprop --typo3-search-line-height
 * @cssprop --typo3-search-input-border-radius
 * @cssprop --typo3-search-input-border-width
 * @cssprop --typo3-search-input-border-width
 * @cssprop --typo3-search-input-border-color
 * @cssprop --typo3-search-icon-size
 * @cssprop --typo3-search-icon-margin-left
 * @cssprop --typo3-search-reset-button-width
 *
 * @fires typo3-search-change - Dispatched on input change
 * @fires typo3-search-submit - Dispatched on submit
 *
 * @slot search-icon - Search icon
 * @slot reset-icon - Reset icon
 */
@customElement('typo3-search')
export class Typo3Search extends LitElement {
  @query('#input')
  private inputElement!: HTMLInputElement;

  @query('#form')
  public form?: HTMLFormElement;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property()
  public label = 'Search';

  @property()
  public placeholder = 'Search';

  @property({ type: String })
  public value = '';

  public static styles = [themeStyles, styles];

  protected render(): TemplateResult {
    return html`
      <form
        id="form"
        @submit=${this.handleSubmit}
        @keydown=${this.handleKeydown}
      >
        <slot name="search-icon"></slot>
        ${this.renderInput} ${this.renderResetButton}
      </form>
    `;
  }

  private get renderInput(): TemplateResult {
    return html`
      <input
        aria-label=${this.label || this.placeholder}
        id="input"
        placeholder=${this.placeholder}
        .value=${this.value}
        @input=${this.onInput}
        ?disabled=${this.disabled}
      />
    `;
  }

  private get renderResetButton(): TemplateResult {
    if ('' === this.value) {
      return html``;
    }

    return html`
      <typo3-button
        only-icon
        id="reset-button"
        tab-index="-1"
        @click="${this.reset}"
      >
        <slot name="reset-icon" slot="icon"></slot>
      </typo3-button>
    `;
  }

  protected onInput(): void {
    this.value = this.inputElement.value;
    const selectionStart = this.inputElement.selectionStart as number;
    this.updateComplete.then(() => {
      this.inputElement.setSelectionRange(selectionStart, selectionStart);
      this.dispatchEvent(
        new CustomEvent('typo3-search-change', {
          bubbles: true,
          composed: true,
          detail: this.value,
        })
      );
    });
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('typo3-search-submit', {
        bubbles: true,
        composed: true,
        detail: this.value,
      })
    );
  }

  private handleKeydown(event: KeyboardEvent): void {
    const { key } = event;
    if (!this.value || key !== 'Escape') {
      return;
    }
    this.reset();
  }

  public async reset(): Promise<void> {
    if (!this.form) {
      return;
    }
    this.value = '';
    this.form.reset();
    this.inputElement.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
      })
    );
    // The native `change` event on an `input` element is not composed,
    // so this synthetic replication of a `change` event must not be
    // either as the `Textfield` baseclass should only need to handle
    // the native variant of this interaction.
    this.inputElement.dispatchEvent(
      new InputEvent('change', {
        bubbles: true,
      })
    );

    await this.updateComplete;
  }
}
