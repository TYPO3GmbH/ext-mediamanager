import { Cell } from '../Cell';

export interface CanvasDataGridEvent extends Event {
  ctx: CanvasRenderingContext2D;
  cell: Cell;
  NativeEvent?: MouseEvent;
}
