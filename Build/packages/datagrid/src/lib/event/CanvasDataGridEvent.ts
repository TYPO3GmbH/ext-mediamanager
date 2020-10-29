export interface CanvasDataGridEvent extends Event {
  ctx: CanvasRenderingContext2D;
  cell: {
    formattedValue: string;
    type: string;
    rowIndex: number;
    value: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isGrid: boolean;
    isHeader: boolean;
    header: {
      name: string;
    };
  };
}
