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
  sorters: {
    string: Function;
  };
  selectNone(): void;
  selectRow(rowIndex: number): void;
  beginEditAt(columnIndex: number, rowIndex: number): void;
  endEdit(abort: boolean): void;
  draw(): void;
}
