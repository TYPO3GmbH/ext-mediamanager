/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import {
  Constructor,
  html,
  LitElement,
  query,
  TemplateResult,
} from 'lit-element';
import * as d3 from 'd3';
import { D3DragEvent } from 'd3';
import { Node } from '../../../types/node';
import { store } from './redux/store';
import { FileActions } from './redux/ducks/actions';
import { Typo3Draghandler } from '../../../packages/draghandler/src/typo3-draghandler';
import { PropertyValues } from 'lit-element/src/lib/updating-element';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import {
  getDragMode,
  getSelectedItems,
  isCopyDragMode,
  isDraggingFiles,
} from './redux/ducks/selectors';
import { RootState } from './redux/ducks/reducers';
import { translate } from './services/translation.service';
import { createSVGElement } from './lib/svg-helper';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

interface DragData {
  startPageX: number;
  startPageY: number;
  startDrag: boolean;
}

export function Typo3DragBehaviourMixin<T extends Constructor<LitElement>>(
  constructor: T
): T & Constructor<LitElement> {
  class Typo3DragBehaviourMixin extends constructor {
    @query('typo3-draghandler') private filesDragHandler!: Typo3Draghandler;

    private currentTarget!: ListItem | Node | null;

    private dragData!: DragData;

    private overDragSubscription!: Subscription;

    private state: !RootState;

    updated(_changedProperties: PropertyValues): void {
      super.updated(_changedProperties);

      const selection = d3.selectAll(
        this.shadowRoot.querySelectorAll('[draggable]')
      );

      selection.on('mousedown.drag', null);

      const dragHandler = d3
        .drag()
        .clickDistance(0)
        .on('start', event => this.dragStart(event))
        .on('drag', event => this.dragDragged(event))
        .on('end', () => this.dragEnd());
      dragHandler(selection);
    }

    dragStart(event: D3DragEvent<Element, unknown, unknown>): void {
      this.dragData = {
        startPageX: event.sourceEvent.pageX,
        startPageY: event.sourceEvent.pageY,
        startDrag: false,
      };
    }
    dragDragged(event: D3DragEvent<Element, unknown, unknown>): boolean {
      if (this.isDragNodeDistanceMore(event, this.dragData, 10)) {
        if (false === this.dragData.startDrag) {
          this.dragData.startDrag = true;
          store.dispatch(new FileActions.DragFilesStart());

          const events = [
            'typo3-card-mouseover',
            'typo3-node-mouseover',
            'typo3-card-mouseout',
            'typo3-node-mouseout',
          ];

          const eventStreams = events.map(ev => fromEvent(this, ev));

          this.overDragSubscription = merge(...eventStreams).subscribe(
            (e: CustomEvent<Node | ListItem | null>) => {
              this.currentTarget = e.detail;
            }
          );
        }
      } else {
        return false;
      }

      if (getSelectedItems(this.state).length === 0) {
        this.dragEnd();
        return false;
      }

      const dragMode = event.sourceEvent.ctrlKey == true ? 'copy' : 'move';
      if (dragMode != getDragMode(this.state)) {
        store.dispatch(new FileActions.DragFilesChangeMode(dragMode));
      }

      let left = 10;
      let top = 15;

      if (event.sourceEvent && event.sourceEvent.pageX) {
        left += event.sourceEvent.pageX;
      }

      if (event.sourceEvent && event.sourceEvent.pageY) {
        top += event.sourceEvent.pageY;
      }

      this.filesDragHandler.style.left = left + 'px';
      this.filesDragHandler.style.top = top + 'px';

      if (this.isAllowedDrop()) {
        document.body.style.setProperty(
          'cursor',
          '-webkit-grabbing',
          'important'
        );
      } else {
        document.body.style.setProperty('cursor', 'not-allowed', 'important');
      }
    }

    dragEnd(): void {
      document.body.style.cursor = 'default';
      if (true == this.dragData?.startDrag) {
        this.dragData.startDrag = false;
        this.overDragSubscription?.unsubscribe();

        if (this.isAllowedDrop()) {
          const identifiers = getSelectedItems(this.state).map(
            (listItem: ListItem) => listItem.identifier
          );
          const action = isCopyDragMode(this.state)
            ? new FileActions.CopyFiles(identifiers, this.currentTarget)
            : new FileActions.MoveFiles(identifiers, this.currentTarget);
          store.dispatch(action);
        }
        store.dispatch(new FileActions.DragFilesEnd());
      }
      this.currentTarget = null;
    }

    isAllowedDrop(): boolean {
      if (false === isDraggingFiles(this.state)) {
        return false;
      }

      if (true !== this.currentTarget?.allowEdit) {
        return false;
      }

      if ('_FOLDER' !== this.currentTarget?.sysType) {
        return false;
      }

      const identifiers = getSelectedItems(this.state).map(
        (listItem: ListItem) => listItem.identifier
      );

      if (0 === identifiers.length) {
        return false;
      }

      return false === identifiers.includes(this.currentTarget?.identifier);
    }

    isDragNodeDistanceMore(
      event: D3DragEvent<any, any, any>,
      data: DragData,
      distance: number
    ) {
      return (
        data.startDrag ||
        data.startPageX - distance > event.sourceEvent.pageX ||
        data.startPageX + distance < event.sourceEvent.pageX ||
        data.startPageY - distance > event.sourceEvent.pageY ||
        data.startPageY + distance < event.sourceEvent.pageY
      );
    }

    protected render(): TemplateResult {
      return this.renderDragHandler;
    }

    protected get renderDragHandler(): TemplateResult {
      let iconKey = 'moveTo';
      let message = translate('dnd.move.message');
      let title = translate('dnd.move.title');

      if (isCopyDragMode(this.state)) {
        iconKey = 'copyTo';
        message = translate('dnd.copy.message');
        title = translate('dnd.copy.title');
      }

      title = title.replace(/%\w*/gm, '' + getSelectedItems(this.state).length);

      return html`
        <typo3-draghandler
          .hidden="${isDraggingFiles(this.state) !== true ||
          0 === getSelectedItems(this.state).length}"
        >
          ${createSVGElement(iconKey, 'icon')}
          <span slot="title">${title}</span>
          <span slot="message">${unsafeHTML(message)}</span>
        </typo3-draghandler>
      `;
    }
  }

  return Typo3DragBehaviourMixin;
}
