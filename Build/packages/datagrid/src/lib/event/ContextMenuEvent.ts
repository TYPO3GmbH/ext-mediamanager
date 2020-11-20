import { CanvasDataGridEvent } from './CanvasDataGridEvent';

export interface ContextMenuEvent extends CanvasDataGridEvent {
  NativeEvent: MouseEvent;
}
