export interface CanvasDataGridEvent extends Event {
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
