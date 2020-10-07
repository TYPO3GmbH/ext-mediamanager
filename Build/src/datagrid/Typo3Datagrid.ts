import {
  CSSResultArray,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { datagridStyles } from './typo3-datagrid-styles';

export class Typo3Datagrid extends LitElement {
  @property({ type: String }) schema = '';

  @property({ type: String }) data = '';

  @query('canvas-datagrid') canvas!: HTMLElement;

  static get styles(): CSSResultArray {
    return [datagridStyles];
  }

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
