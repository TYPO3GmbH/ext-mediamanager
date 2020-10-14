import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import style from './typo3-tooltip.scss';

export type Position = 'top' | 'right' | 'bottom' | 'left';

@customElement('typo3-tooltip')
export class Typo3Tooltip extends LitElement {
  @property({ type: String, attribute: 'anchor-element-id' })
  anchorElementId?: string;

  @property({ type: Number }) offset = 14;

  @property({ type: String, reflect: true }) position: Position = 'bottom';

  @internalProperty() isHidden = true;

  @query('#tooltip') protected tooltipHtmlElement!: HTMLSlotElement | null;

  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      <div id="tooltip" ?hidden="${this.isHidden}">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const anchorElement = this.anchorElement;
    anchorElement?.addEventListener('mouseenter', () => this.show());
    anchorElement?.addEventListener('focus', () => this.show());
    anchorElement?.addEventListener('mouseleave', () => this.hide());
    anchorElement?.addEventListener('blur', () => this.hide());
    anchorElement?.addEventListener('tap', () => this.hide());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    const anchorElement = this.anchorElement;
    anchorElement?.removeEventListener('mouseenter', () => this.show());
    anchorElement?.removeEventListener('focus', () => this.show());
    anchorElement?.removeEventListener('mouseleave', () => this.hide());
    anchorElement?.removeEventListener('blur', () => this.hide());
    anchorElement?.removeEventListener('tap', () => this.hide());
  }

  show(): void {
    this.isHidden = false;
    this.updatePosition();
  }

  hide(): void {
    this.isHidden = true;
  }

  protected updatePosition(): void {
    const anchorElement = this.anchorElement;
    if (null === this.anchorElement) {
      return;
    }

    const offset = this.offset;

    const parentRect = this.offsetParent!.getBoundingClientRect();
    const targetRect = anchorElement!.getBoundingClientRect();
    const thisRect = this.tooltipHtmlElement!.getBoundingClientRect();

    const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    const targetLeft = targetRect.left - parentRect.left;
    const targetTop = targetRect.top - parentRect.top;

    let tooltipLeft = 0;
    let tooltipTop = 0;

    switch (this.position) {
      case 'top':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'bottom':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'left':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
    }

    this.style.left = tooltipLeft + 'px';
    this.style.top = tooltipTop + 'px';
  }

  protected get anchorElement(): HTMLElement | null {
    const parentElement = this.parentElement;

    if (null === parentElement) {
      return null;
    }

    if (this.anchorElementId) {
      return parentElement.querySelector('#' + this.anchorElementId);
    }

    return parentElement;
  }
}
