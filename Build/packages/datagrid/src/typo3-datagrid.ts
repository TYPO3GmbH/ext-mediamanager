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
import { PropertyValues } from 'lit-element/lib/updating-element';
import * as _ from 'lodash-es';

/**
 *@fires typo3-datagrid-selection-change - Dispatched on change of selection
 */
@customElement('typo3-datagrid')
export class Typo3Datagrid extends LitElement {
  @property({ type: String }) schema = '';

  @property({ type: String }) data = '';

  @property({ type: Boolean }) editable = false;

  @property({ type: Array }) selectedRows: { [key: string]: string }[] = [];

  @property({ type: String }) rowIdentifier = 'uid';

  @query('canvas-datagrid') canvasGrid!: CanvasDatagrid;

  public static styles = [themeStyles, styles];

  protected imageBuffer: { [key: string]: HTMLImageElement } = {};

  render(): TemplateResult {
    return html`
      <canvas-datagrid
        @rendercell="${this._onRendercell}"
        @contextmenu="${this._onContextmenu}"
        @afterrendercell="${this._onAfterRendercell}"
        @rendertext="${this._onRenderText}"
        @renderorderbyarrow="${this._onRenderOrderByArrow}"
        @selectionchanged="${this._onSelectionChanged}"
        selectionmode="row"
        showrowheaders="false"
        schema="${this.schema}"
        data="${this.data}"
        editable="${this.editable}"
      ></canvas-datagrid>
    `;
  }

  updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('selectedRows')) {
      const expectedRowNumbers = this.selectedRows.map(row =>
        this.canvasGrid.data.findIndex(
          dataRow => dataRow[this.rowIdentifier] === row[this.rowIdentifier]
        )
      );

      const currentSelectedRowNumbers = this.canvasGrid.selectedRows
        .map((value, key) => (value ? key : undefined))
        .filter(rowNumber => typeof rowNumber != 'undefined');

      if (_.xor(expectedRowNumbers, currentSelectedRowNumbers).length != 0) {
        this.canvasGrid.selectNone();
        expectedRowNumbers.forEach(row => this.canvasGrid.selectRow(row));
      }
    }
  }

  _onRenderText(e: RenderCellEvent): void {
    if (
      e.cell.type === 'html' &&
      e.cell.value &&
      e.cell.rowIndex > -1 &&
      /img/.test(e.cell.value)
    ) {
      e.cell.formattedValue = '';
    }
  }

  _onAfterRendercell(e: RenderCellEvent): void {
    if (
      e.cell.type === 'html' &&
      e.cell.value &&
      e.cell.rowIndex > -1 &&
      /img/.test(e.cell.value)
    ) {
      if (!this.imageBuffer[e.cell.value]) {
        const domElement = new DOMParser().parseFromString(
          e.cell.value,
          'text/html'
        );
        const imageElement = domElement.querySelector(
          'img'
        ) as HTMLImageElement;
        const src = imageElement.src;

        const image = new Image();
        this.imageBuffer[e.cell.value] = image;
        image.src = src;
        if (imageElement.width > 0) {
          image.setAttribute('targetWidth', '' + imageElement.width);
        }
        if (imageElement.height > 0) {
          image.setAttribute('targetHeight', '' + imageElement.height);
        }

        image.onload = () => {
          this.canvasGrid.draw();
        };
        return;
      }

      const image = this.imageBuffer[e.cell.value];
      if (image && image.width !== 0) {
        const targetWidth = parseInt(
          (image.getAttribute('targetWidth') as string) ?? e.cell.height
        );
        const targetHeight = parseInt(
          (image.getAttribute('targetHeight') as string) ??
            e.cell.height * (image.width / image.height)
        );

        const x = e.cell.x + (e.cell.width - targetWidth) / 2;
        const y = e.cell.y + (e.cell.height - targetHeight) / 2;

        e.ctx.drawImage(image, x, y, targetWidth, targetHeight);
      }
    }
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
    const canvasStyle = this.canvasGrid.style;

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

    if (this.canvasGrid.orderDirection === 'asc') {
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

  _onSelectionChanged(event: {
    selectedData: { [key: number]: string }[];
  }): void {
    const selectedKeys: string[] = event.selectedData.map((value, key) =>
      value ? '' + key : ''
    );

    const selectedData = this.canvasGrid.data.filter((value, index) =>
      selectedKeys.includes('' + index)
    );

    this.dispatchEvent(
      new CustomEvent('typo3-datagrid-selection-change', {
        detail: selectedData,
      })
    );
  }
}
