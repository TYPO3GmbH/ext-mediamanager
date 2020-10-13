export interface RenderCellEvent {
  ctx: CanvasRenderingContext2D;
  cell: {
    x: number;
    y: number;
    width: number;
    height: number;
    isGrid: boolean;
    isHeader: boolean;
  };
}
