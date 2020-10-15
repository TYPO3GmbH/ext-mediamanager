import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-breadcrumb-item.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 * @cssprop --typo3-breadcrumb-item-color-active
 * @cssprop --typo3-breadcrumb-item-color
 */
@customElement('typo3-breadcrumb-item')
export class Typo3BreadcrumbItem extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;

  @property({ type: String, reflect: true }) title = '';

  @property({ type: String, reflect: true }) link = null;

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    if (null === this.link) {
      return html` <span class="breadcrumb-item">${this.title}</span>`;
    }

    return html` <a
      class="breadcrumb-item"
      href="${this.link}"
      title="${this.title}"
      >${this.title}</a
    >`;
  }
}
