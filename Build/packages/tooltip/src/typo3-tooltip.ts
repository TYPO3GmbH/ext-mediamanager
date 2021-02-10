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
  PropertyValues,
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-tooltip.pcss';
import themeStyles from '../../../theme/index.pcss';

export type Position = 'top' | 'right' | 'bottom' | 'left';

@customElement('typo3-tooltip')
export class Typo3Tooltip extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: HTMLElement }) anchor!: HTMLElement;

  @property({ type: Number }) offset = 14;

  @property({ type: String, reflect: true }) position: Position = 'bottom';

  @internalProperty() isHidden = true;

  @query('#tooltip') protected tooltipHtmlElement!: HTMLSlotElement | null;

  render(): TemplateResult {
    return html`
      <div id="tooltip" ?hidden="${this.isHidden}">
        <slot></slot>
      </div>
    `;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    const anchorElement = this.anchor;
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

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    const anchorElement = this.anchor;
    anchorElement?.addEventListener('mouseenter', () => this.show());
    anchorElement?.addEventListener('focus', () => this.show());
    anchorElement?.addEventListener('mouseleave', () => this.hide());
    anchorElement?.addEventListener('blur', () => this.hide());
    anchorElement?.addEventListener('tap', () => this.hide());
  }

  protected updatePosition(): void {
    if (!this.anchor) {
      return;
    }

    const offset = this.offset;

    const parentRect = this.offsetParent!.getBoundingClientRect();
    const targetRect = this.anchor!.getBoundingClientRect();
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
      case 'left':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'bottom':
      default:
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
    }

    this.style.left = tooltipLeft + 'px';
    this.style.top = tooltipTop + 'px';
  }
}
