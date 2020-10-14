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
  orderDirection: 'asc' | 'desc';
  style: CustomCanvasCSStyleDeclaration;
}
