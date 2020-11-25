import { CanvasDataGridEvent } from './CanvasDataGridEvent';

export interface EndEditEvent extends CanvasDataGridEvent {
  aborted: boolean; // true, when the edit was aborted
  value: string;
}
