import { css } from 'lit-element';

export const datagridStyles = css`
  :host canvas-datagrid {
    --cdg-grid-background-color: #fff;
    --cdg-grid-border-color: transparent;
    --cdg-column-header-cell-background-color: transparent;
    --cdg-column-header-cell-hover-background-color: transparent;
    --cdg-column-header-cell-cap-background-color: transparent;
    --cdg-active-column-header-cell-background-color: transparent;
    --cdg-corner-cell-background-color: transparent;
    --cdg-row-header-cell-background-color: transparent;
    --cdg-row-header-cell-hover-background-color: transparent;
    --cdg-active-row-header-cell-background-color: transparent;
    --cdg-cell-background-color: transparent;
    --cdg-cell-hover-background-color: transparent;
    --cdg-cell-border-color: #000;
    --cdg-active-cell-border-color: #000;
    --cdg-active-cell-overlay-border-color: #000;
    --cdg-column-header-cell-border-color: transparent;
    --cdg-column-header-cell-cap-border-color: transparent;
    --cdg-corner-cell-border-color: transparent;
    --cdg-row-header-cell-border-color: transparent;
    --cdg-grid-border-width: 1;
    --cdg-cell-border-width: 1;
    --cdg-active-cell-border-width: 1;
    --cdg-active-cell-overlay-border-width: 1;
    --cdg-column-header-cell-border-width: 1;
    --cdg-frozen-marker-border-width: 1;
    --cdg-cell-color: #212424;
    --cdg-cell-font: 14px Verdana;
    --cdg-active-cell-font: 14px Verdana;
    --cdg-column-header-cell-font: 14px Verdana;
  }
`;
