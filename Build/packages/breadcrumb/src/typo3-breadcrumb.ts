import {
  customElement,
  html,
  LitElement,
  queryAssignedNodes,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-breadcrumb.pcss';
import themeStyles from '../../../theme/index.pcss';

/**
 *  @cssprop --typo3-breadcrumb-background-color
 *  @cssprop --typo3-breadcrumb-border-radius
 *  @cssprop --typo3-breadcrumb-margin-bottom
 *  @cssprop --typo3-breadcrumb-padding-y
 *  @cssprop --typo3-breadcrumb-separator-content
 *  @cssprop --typo3-breadcrumb-separator-gap
 */
@customElement('typo3-breadcrumb')
export class Typo3breadcrumb extends LitElement {
  @queryAssignedNodes() items!: HTMLElement[];

  public static styles = [themeStyles, styles];

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  private handleResize = (event: Event): void => {
    console.log('todo');
  };
}
