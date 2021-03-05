/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import {
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

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
import { Cell } from './lib/Cell';
import { CellHeader } from './lib/cell-header';
import styles from './typo3-datagrid.pcss';
import { styleMap } from 'lit-html/directives/style-map';
import { fromEvent, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

/**
 *@fires typo3-datagrid-selection-change - Dispatched on change of selection
 *@fires typo3-datagrid-value-change - Dispatched on change of a cell value
 *@fires typo3-datagrid-contextmenu - Dispatched on row contextmenu
 *@fires typo3-datagrid-dblclick - Dispatched on row dblclick
 */
@customElement('typo3-datagrid')
export class Typo3Datagrid extends LitElement {
  public static styles = [themeStyles, styles];

  @property({ type: Array }) schema: CellHeader[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Object }) sorters: { [key: string]: Function } = {};
  @property({ type: Array }) editableColumns: string[] = [];
  @property({ type: Array }) selectedRows: { [key: string]: string }[] = [];
  @property({ type: String }) rowIdentifier = 'identifier';

  @internalProperty()
  transformedColumns: CellHeader[] = [];

  @query('canvas-datagrid') canvasGrid!: CanvasDatagrid;
  @query('.flex-columns') flexColumnsHelper!: HTMLElement;

  protected imageBuffer: { [key: string]: HTMLImageElement } = {};
  protected additionalStyles: { disabledCellOpacity?: number } = {};
  protected clicks = 0;
  private latestSelectedRowIndex?: number;
  private inEditMode = false;
  private resizeSubscription!: Subscription;
  private fillColorBuffer: { [key: string]: string } = {};

  render(): TemplateResult {
    return html` ${this.renderFlexColumns} ${this.renderGrid} `;
  }

  get renderFlexColumns(): TemplateResult {
    return html`<div class="flex-columns">
      ${this.schema
        .filter(header => header.hidden !== true)
        .map(header => {
          let styles = {};
          if (header.width && header.width !== 'auto') {
            styles = {
              ...styles,
              flex: `0 0 ${header.width}px`,
            };
          }
          if (header.minWidth) {
            styles = {
              ...styles,
              minWidth: `${header.minWidth}px`,
            };
          }

          return html`<div
            id="${header.name}"
            style=${styleMap(styles)}
          ></div>`;
        })}
    </div>`;
  }

  get renderGrid(): TemplateResult {
    const borderDragMode = this.draggable ? 'move' : 'none';
    const columns =
      this.transformedColumns.length > 0
        ? this.transformedColumns
        : this.schema;

    return html`
      <canvas-datagrid
        style="
          --cdg-active-cell-border-color: var(--typo3-global-datagrid-border-color);
          --cdg-active-cell-border-width: var(--typo3-global-datagrid-cell-border-width);
          --cdg-active-cell-font: var(--typo3-global-datagrid-font);
          --cdg-active-cell-overlay-border-color: transparent;
          --cdg-active-cell-overlay-border-width: var(--typo3-global-datagrid-cell-border-width);
          --cdg-active-column-header-cell-background-color: transparent;
          --cdg-active-row-header-cell-background-color: transparent;
          --cdg-cell-background-color: transparent;
          --cdg-cell-border-color: var(--typo3-global-datagrid-border-color);
          --cdg-cell-border-width: var(--typo3-global-datagrid-cell-border-width);
          --cdg-cell-color: var(--typo3-global-datagrid-cell-color);
          --cdg-cell-font: var(--typo3-global-datagrid-font);
          --cdg-cell-height: var(--typo3-global-datagrid-cell-height);
          --cdg-cell-hover-background-color: transparent;
          --cdg-column-header-cell-background-color: transparent;
          --cdg-column-header-cell-border-color: transparent;
          --cdg-column-header-cell-border-width: var(--typo3-global-datagrid-cell-border-width);
          --cdg-column-header-cell-cap-background-color: transparent;
          --cdg-column-header-cell-cap-border-color: transparent;
          --cdg-column-header-cell-color: var(--typo3-global-datagrid-cell-color);
          --cdg-column-header-cell-font: var(--typo3-global-datagrid-font);
          --cdg-column-header-cell-hover-background-color: transparent;
          --cdg-column-header-order-by-arrow-border-color: var(--typo3-global-datagrid-order-arrow-color);
          --cdg-column-header-order-by-arrow-border-width: 2;
          --cdg-column-header-order-by-arrow-height: 4;
          --cdg-column-header-order-by-arrow-width: 8;
          --cdg-corner-cell-background-color: transparent;
          --cdg-corner-cell-border-color: transparent;
          --cdg-frozen-marker-border-width: var(--typo3-global-datagrid-cell-border-width);
          --cdg-grid-background-color: #fff;
          --cdg-grid-border-color: transparent;
          --cdg-grid-border-width: var(--typo3-global-datagrid-cell-border-width);
          --cdg-row-header-cell-background-color: transparent;
          --cdg-row-header-cell-border-color: transparent;
          --cdg-row-header-cell-hover-background-color: transparent;
          --cdg-selection-overlay-borderColor: transparent;
          --cdg-disabled-cell-opacity: 0.5;
        "
        allowcolumnreordering="false"
        allowcolumnresize="false"
        borderdragbehavior="${borderDragMode}"
        .data="${this.data}"
        .schema="${columns}"
        editable="${this.editableColumns.length > 0}"
        selectionmode="row"
        showrowheaders="false"
        @afterrendercell="${this._onAfterRendercell}"
        @beforebeginedit="${this._onBeforeBeginEdit}"
        @beginedit="${this._onBeginEdit}"
        @beginmove="${this._onBeginmove}"
        @mouseup="${this._onMouseup}"
        @contextmenu="${this._onContextmenu}"
        @dblclick="${this._onDblClick}"
        @endedit="${this._onEndEdit}"
        @mousedown="${this._onMousedown}"
        @rendercell="${this._onRendercell}"
        @renderorderbyarrow="${this._onRenderOrderByArrow}"
        @rendertext="${this._onRenderText}"
        @selectionchanged="${this._onSelectionChanged}"
      ></canvas-datagrid>
    `;
  }

  getColumnsWithCaluclatedWidths(): CellHeader[] {
    if (!this.flexColumnsHelper) {
      return [];
    }

    return this.schema.map(column => {
      const flexDiv = this.flexColumnsHelper.querySelector(`#${column.name}`);
      const calculatedWidth = flexDiv ? flexDiv.clientWidth : 0;
      return {
        ...column,
        width: calculatedWidth + '',
      };
    });
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

  disconnectedCallback() {
    this._endEdit();
    this.resizeSubscription.unsubscribe();
    super.disconnectedCallback();
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        delay(200),
        tap(
          () =>
            (this.transformedColumns = [
              ...this.getColumnsWithCaluclatedWidths(),
            ])
        )
      )
      .subscribe();
  }

  _onRenderText(e: RenderCellEvent): void {
    if (this._isSvgCell(e.cell)) {
      e.cell.formattedValue = '';
    }
    this._handleDisabledRow(e);
  }

  _onAfterRendercell(e: RenderCellEvent): void {
    if (this._isSvgCell(e.cell)) {
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

        const fillColor = (domElement.querySelector(
          'svg'
        ) as SVGElement).getAttribute('fill');
        if (fillColor) {
          this.fillColorBuffer[id] = fillColor;
        }

        fetch(src)
          .then(r => r.text())
          .then(markup =>
            new DOMParser().parseFromString(markup, 'image/svg+xml')
          )
          .then(doc => {
            const node = doc.getElementById(id) as HTMLElement;
            node.setAttribute('width', '16px');
            node.setAttribute('height', '16px');
            if (this.fillColorBuffer[id]) {
              node.setAttribute('fill', this.fillColorBuffer[id]);
            }
            const xml = new XMLSerializer().serializeToString(node);
            const svgURL = xml
              .replace('symbol', 'svg')
              .replace('symbol', 'svg');

            const svg = new Blob([svgURL], {
              type: 'image/svg+xml',
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
        const targetWidth = image.width;
        const targetHeight = image.height;

        e.ctx.fillStyle = 'blue';

        const x = e.cell.x + (e.cell.width - targetWidth) / 2;
        const y = e.cell.y + (e.cell.height - targetHeight) / 2;

        this._handleDisabledRow(e);

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

  _onDblClick(e: CanvasDataGridEvent): void {
    if (true === e.cell.isHeader) {
      return;
    }

    // will be handled in _onClick
    e.preventDefault();
  }

  _onMousedown(e: CanvasDataGridEvent): void {
    if (this._isNotSelectableRow(e.cell)) {
      e.preventDefault();
      return;
    }
    console.log(e);

    if (e.cell.isHeader) {
      e.preventDefault();
      return;
    }

    if (e.cell.header.name === 'selected') {
      this.canvasGrid.selectRow(e.cell.rowIndex, true);
      e.preventDefault();
      return;
    }
  }

  _onBeginmove(): void {
    // trigger mouseup to prevent default move handling
    setTimeout(
      () => document.body.dispatchEvent(new MouseEvent('mouseup')),
      10
    );
  }

  _onMouseup(e: CanvasDataGridEvent): void {
    if (true === e.cell.isHeader) {
      return;
    }
    if (this.inEditMode) {
      return;
    }
    if (e.NativeEvent!.button !== 0) {
      return;
    }

    this.clicks += 1;
    const selectedIndex = e.cell.selected ? e.cell.rowIndex : undefined;

    if (this.clicks === 1) {
      this.latestSelectedRowIndex = selectedIndex;

      setTimeout(() => {
        if (this.clicks === 1) {
          if (
            selectedIndex != undefined &&
            selectedIndex === this.latestSelectedRowIndex
          ) {
            this._handleSingleClick(e);
            this.latestSelectedRowIndex = undefined;
          }
        } else {
          const dblClickEvent = new CustomEvent('typo3-datagrid-dblclick', {
            bubbles: true,
            composed: true,
            detail: e.cell.data,
          });
          this.dispatchEvent(dblClickEvent);
          this.latestSelectedRowIndex = undefined;
        }
        this.clicks = 0;
      }, 300);
    }
  }

  _handleSingleClick(e: CanvasDataGridEvent): void {
    if (false === this._isEditableCell(e.cell)) {
      return;
    }
    if (true != e.cell.selected) {
      return;
    }
    this.canvasGrid.beginEditAt(e.cell.columnIndex, e.cell.rowIndex);
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

    if (this.canvasGrid.orderDirection === 'desc') {
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
    if (false === this._isEditableCell(event.cell)) {
      event.preventDefault();
    }
  }

  _onBeginEdit(): void {
    this.inEditMode = true;
    window.addEventListener('click', this._onClickOutsideOfEditArea);
  }

  _onEndEdit(event: EndEditEvent): void {
    this.inEditMode = false;
    window.removeEventListener('click', this._onClickOutsideOfEditArea);

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

  _endEdit(): void {
    try {
      this.canvasGrid.endEdit(true);
    } catch (e) {
      // catch edit cell is undefined error
    }
    this.inEditMode = false;
  }

  _handleDisabledRow(e: RenderCellEvent): void {
    if (
      false ==
      Object.prototype.hasOwnProperty.call(
        this.additionalStyles,
        'disabledCellOpacity'
      )
    ) {
      this.additionalStyles = {
        disabledCellOpacity: parseFloat(
          getComputedStyle(this.canvasGrid).getPropertyValue(
            '--cdg-disabled-cell-opacity'
          )
        ),
      };
    }

    if (
      this._isDisabledRow(e.cell) &&
      this.additionalStyles.disabledCellOpacity
    ) {
      e.ctx.globalAlpha = this.additionalStyles.disabledCellOpacity;
    }
  }

  _isEditableCell(cell: Cell): boolean {
    return this.editableColumns.indexOf(cell.header.name) !== -1;
  }

  _isDisabledRow(cell: Cell): boolean {
    return (
      false === cell.isHeader &&
      Object.prototype.hasOwnProperty.call(cell.data, 'disabled') &&
      true === (cell.data as { disabled: boolean }).disabled
    );
  }

  _isNotSelectableRow(cell: Cell): boolean {
    return (
      Object.prototype.hasOwnProperty.call(cell.data, 'notSelectable') &&
      true === (cell.data as { notSelectable: boolean }).notSelectable
    );
  }

  _isSvgCell(cell: Cell): boolean {
    return (
      cell.type === 'html' &&
      '' !== cell.value &&
      cell.rowIndex > -1 &&
      /use/.test(cell.value)
    );
  }

  _onClickOutsideOfEditArea = () => {
    this._endEdit();
  };

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.transformedColumns = this.getColumnsWithCaluclatedWidths();
    this.canvasGrid.sorters = Object.assign(
      this.canvasGrid.sorters,
      this.sorters
    );
  }
}
