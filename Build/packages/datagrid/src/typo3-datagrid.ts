import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import styles from './typo3-datagrid.pcss';
import themeStyles from '../../../theme/index.pcss';

import { RenderCellEvent } from './lib/event/RenderCellEvent';
import { RenderOrderByArrowEvent } from './lib/event/RenderOrderByArrowEvent';
import { CanvasDatagrid } from './lib/CanvasDatagrid';
import 'canvas-datagrid';

@customElement('typo3-datagrid')
export class Typo3Datagrid extends LitElement {
  @property({ type: String }) schema = '';

  @property({ type: String }) data = '';

  @property({ type: Boolean }) editable = false;

  @query('canvas-datagrid') canvas!: CanvasDatagrid;

  public static styles = [themeStyles, styles];

  render(): TemplateResult {
    return html`
      <canvas-datagrid
        @rendercell="${this._onRendercell}"
        @contextmenu="${this._onContextmenu}"
        @renderorderbyarrow="${this._onRenderOrderByArrow}"
        selectionmode="row"
        showrowheaders="false"
        schema="${this.schema}"
        data="${this.data}"
        editable="${this.editable}"
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

  _onContextmenu(e: Event): void {
    e.preventDefault();
  }

  _onRenderOrderByArrow(e: RenderOrderByArrowEvent): void {
    e.preventDefault();
    const canvasStyle = this.canvas.style;

    let x = e.cell.x;
    let y = e.cell.y;

    e.ctx.font = canvasStyle.columnHeaderCellFont;
    const headerTextWidth = e.ctx.measureText(e.header.title).width;

    const mt = canvasStyle.columnHeaderOrderByArrowMarginTop,
      ml = canvasStyle.columnHeaderOrderByArrowMarginLeft,
      mr = canvasStyle.columnHeaderOrderByArrowMarginRight,
      aw = canvasStyle.columnHeaderOrderByArrowWidth,
      ah = canvasStyle.columnHeaderOrderByArrowHeight;

    x += +mr + headerTextWidth + 5;
    y += e.cell.height / 2 - ah * 1.5;
    e.ctx.fillStyle = canvasStyle.columnHeaderOrderByArrowColor;
    e.ctx.strokeStyle = canvasStyle.columnHeaderOrderByArrowBorderColor;
    e.ctx.lineWidth = canvasStyle.columnHeaderOrderByArrowBorderWidth;

    e.ctx.beginPath();
    x = x + ml;
    y = y + mt;

    if (this.canvas.orderDirection === 'asc') {
      e.ctx.moveTo(x + aw, y);
      e.ctx.lineTo(x + aw * 0.5, y + ah);
      e.ctx.lineTo(x, y);
    } else {
      e.ctx.moveTo(x, y + ah);
      e.ctx.lineTo(x + aw * 0.5, y);
      e.ctx.lineTo(x + aw, y + ah);
    }

    e.ctx.stroke();
  }
}
