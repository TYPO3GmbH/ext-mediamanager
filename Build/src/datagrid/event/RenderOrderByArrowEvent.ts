import { CanvasDataGridEvent } from './CanvasDataGridEvent';

export interface RenderOrderByArrowEvent extends CanvasDataGridEvent {
  header: {
    title: string;
  };
}
