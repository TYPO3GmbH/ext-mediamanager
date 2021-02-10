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

interface CustomCanvasCSStyleDeclaration extends CSSStyleDeclaration {
  columnHeaderCellFont: string;
  columnHeaderOrderByArrowMarginTop: number;
  columnHeaderOrderByArrowMarginLeft: number;
  columnHeaderOrderByArrowMarginRight: number;
  columnHeaderOrderByArrowWidth: number;
  columnHeaderOrderByArrowHeight: number;
  columnHeaderOrderByArrowColor: string;
  columnHeaderOrderByArrowBorderColor: string;
  columnHeaderOrderByArrowBorderWidth: number;
}

export interface CanvasDatagrid extends HTMLElement {
  data: { [key: string]: string }[];
  orderDirection: 'asc' | 'desc';
  style: CustomCanvasCSStyleDeclaration;
  selectedRows: { [key: string]: string }[];
  sorters: { [key: string]: Function };

  selectNone(): void;

  selectRow(rowIndex: number): void;

  beginEditAt(columnIndex: number, rowIndex: number): void;

  endEdit(abort: boolean): void;

  draw(): void;
}
