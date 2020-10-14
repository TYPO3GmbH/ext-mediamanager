import { css, customElement, LitElement } from 'lit-element';
import { SplitLayoutMixin } from '@vaadin/vaadin-split-layout/src/vaadin-split-layout-mixin';

import style from './typo3-splitpane.scss';

@customElement('typo3-splitpane')
export class Typo3Splitpane extends SplitLayoutMixin(LitElement) {
  public static styles = style({ css });
}
