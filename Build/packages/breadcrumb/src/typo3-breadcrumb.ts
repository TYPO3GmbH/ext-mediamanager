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
  queryAssignedNodes,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-breadcrumb.pcss';
import themeStyles from '../../../theme/index.pcss';
import { Typo3BreadcrumbItem } from './typo3-breadcrumb-item';

/**
 * @slot item - Breadcrumb items
 *
 * @cssprop --typo3-breadcrumb-background-color
 * @cssprop --typo3-breadcrumb-border-radius
 * @cssprop --typo3-breadcrumb-separator-content
 * @cssprop --typo3-breadcrumb-separator-gap
 */
@customElement('typo3-breadcrumb')
export class Typo3breadcrumb extends LitElement {
  public static styles = [themeStyles, styles];

  @queryAssignedNodes('item', false, 'typo3-breadcrumb-item')
  items!: Typo3BreadcrumbItem[];

  private resizeAction!: number;
  private resizeObserver!: ResizeObserver;

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
    this.resizeObserver.disconnect();
  }

  render(): TemplateResult {
    return html` <div class="breadcrumb">
      <slot name="item"></slot>
    </div>`;
  }

  private handleResize = (): void => {
    if (this.resizeAction) {
      window.clearTimeout(this.resizeAction);
    }
    this.resizeAction = window.setTimeout(this.stripBreadcrumbs, 100);
  };

  private stripBreadcrumbs = (): void => {
    const availableWidth = this.getBoundingClientRect().width;

    this.items.forEach(element => (element.shortened = false));

    let estimatedWidth = this.items
      .map(item => item.originalWidth)
      .reduce((a: number, b: number) => a + b, 0);

    const shortableItems = this.items.slice(1, -1);

    while (estimatedWidth > availableWidth && shortableItems.length > 0) {
      const currentBreadcrumbItem = shortableItems.shift() as Typo3BreadcrumbItem;
      estimatedWidth -= currentBreadcrumbItem.originalWidth - 35;
      currentBreadcrumbItem.shortened = true;
    }
  };
}
