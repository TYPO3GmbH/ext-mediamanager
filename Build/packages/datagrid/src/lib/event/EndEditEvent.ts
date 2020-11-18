import { CanvasDataGridEvent } from './CanvasDataGridEvent';

export interface EndEditEvent extends CanvasDataGridEvent {
  abort: boolean; // true, when the edit was aborted
  value: string;
}
