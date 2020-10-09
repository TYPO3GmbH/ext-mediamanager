import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import style from './typo3-datagrid.scss';

export class Typo3Datagrid extends LitElement {
  @property({ type: String }) schema = '';

  @property({ type: String }) data = '';

  @query('canvas-datagrid') canvas!: HTMLElement;

  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      <canvas-datagrid
        selectionmode="row"
        showrowheaders="false"
        schema="${this.schema}"
        data="${this.data}"
      ></canvas-datagrid>
    `;
  }
}
