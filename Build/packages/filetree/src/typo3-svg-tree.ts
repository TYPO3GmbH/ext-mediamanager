import { html, LitElement, TemplateResult } from 'lit-element';

import styles from './typo3-filetree.pcss';
import themeStyles from '../../../theme/index.pcss';

export class Typo3SvgTree extends LitElement {
  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html` Test 12345`;
  }
}
