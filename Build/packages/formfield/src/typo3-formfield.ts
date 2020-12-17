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
  @property({ type: String })
  public label = '';

  @property({ type: String, attribute: 'label-align', reflect: true })
  public labelAlign: 'right' | 'left' | 'top' = 'top';

  @query('slot') protected slotEl!: HTMLSlotElement;

  public static styles = [themeStyles, styles];

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
