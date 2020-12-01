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
import { CanvasDataGridEvent } from './lib/event/CanvasDataGridEvent';
import { EndEditEvent } from './lib/event/EndEditEvent';
import { ContextMenuEvent } from './lib/event/ContextMenuEvent';

/**
 *@fires typo3-datagrid-selection-change - Dispatched on change of selection
 *@fires typo3-datagrid-value-change - Dispatched on change of a cell value
 *@fires typo3-datagrid-contextmenu - Dispatched on row contextmenu
 */
@customElement('typo3-datagrid')
export class Typo3Datagrid extends LitElement {
  @property({ type: String }) schema = '';

  @property({ type: String }) data = '';

  @property({ type: Array }) editableColumns: string[] = [];

  @property({ type: Array }) selectedRows: { [key: string]: string }[] = [];

  @property({ type: String }) rowIdentifier = 'identifier';

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
        @beforebeginedit="${this._onBeforeBeginEdit}"
        @endedit="${this._onEndEdit}"
        selectionmode="row"
        showrowheaders="false"
        schema="${this.schema}"
        data="${this.data}"
        editable="${this.editableColumns.length > 0}"
      ></canvas-datagrid>
    `;
  }

  firstUpdated(): void {
    this.focus();
    this.canvasGrid!.focus();
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
      /use/.test(e.cell.value)
    ) {
      if (!this.imageBuffer[e.cell.value]) {
        const domElement = new DOMParser().parseFromString(
          e.cell.value,
          'text/html'
        );
        const useElement = domElement.querySelector('use') as SVGUseElement;

        if (!useElement) {
          return;
        }

        const src = useElement.href.baseVal;
        const id = src.replace(/.*#/, '');
        const img = new Image();

        this.imageBuffer[e.cell.value] = img;

        fetch(src)
          .then(r => r.text())
          .then(markup =>
            new DOMParser().parseFromString(markup, 'image/svg+xml')
          )
          .then(doc => {
            const node = doc.getElementById(id) as HTMLElement;
            const xml = new XMLSerializer().serializeToString(node);
            const svgURL = xml
              .replace('symbol', 'svg')
              .replace('symbol', 'svg');

            const svg = new Blob([svgURL], {
              type: 'image/svg+xml;charset=utf-8',
            });
            const domURL = self.URL || self.webkitURL || self;
            const url = domURL.createObjectURL(svg);

            img.onload = () => {
              this.canvasGrid.draw();
              domURL.revokeObjectURL(url);
            };
            img.src = url;
          });
        return;
      }

      const image = this.imageBuffer[e.cell.value];
      if (image && image.width !== 0) {
        const targetWidth = 16;
        const targetHeight = 16;
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

  _onContextmenu(e: ContextMenuEvent): void {
    e.preventDefault();

    if (true === e.cell.isHeader) {
      return;
    }

    const contextMenuEvent = new CustomEvent('typo3-datagrid-contextmenu', {
      bubbles: true,
      composed: true,
      detail: {
        node: e.cell.data,
        event: e.NativeEvent,
      },
    });
    this.dispatchEvent(contextMenuEvent);
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
  _onBeforeBeginEdit(event: CanvasDataGridEvent): void {
    if (this.editableColumns.indexOf(event.cell.header.name) === -1) {
      event.preventDefault();
    }
  }
  _onEndEdit(event: EndEditEvent): void {
    if (event.aborted === true) {
      return;
    }

    if (event.value !== event.cell.value) {
      const changeEvent = new CustomEvent('typo3-datagrid-value-change', {
        detail: {
          field: event.cell.header.name,
          value: event.value,
          data: event.cell.data,
        },
      });
      this.dispatchEvent(changeEvent);
    }
  }
}
