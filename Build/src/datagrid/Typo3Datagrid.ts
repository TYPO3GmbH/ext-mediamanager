import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import style from './typo3-datagrid.scss';
import { RenderCellEvent } from './RenderCellEvent';

export class Typo3Datagrid extends LitElement {
  @property({ type: String }) schema = '';

  @property({ type: String }) data = '';

  @query('canvas-datagrid') canvas!: HTMLElement;

  public static styles = style({ css });

  render(): TemplateResult {
    return html`
      <canvas-datagrid
        @rendercell="${this._onRendercell}"
        @contextmenu="${this._onContextmenu}"
        selectionmode="row"
        showrowheaders="false"
        schema="${this.schema}"
        data="${this.data}"
      ></canvas-datagrid>
    `;
  }

  _onRendercell(e: RenderCellEvent): void {
    // Draw upper border
    e.ctx.beginPath();
    e.ctx.moveTo(e.cell.x, e.cell.y);
    e.ctx.lineTo(e.cell.x + e.cell.width, e.cell.y);
    e.ctx.stroke();

    // set strokeStyle to transparent to prevent outer border to be drawn
    e.ctx.strokeStyle = 'transparent';
  }

  _onContextmenu(e: Event): boolean {
    e.preventDefault();
    return false;
  }
}
