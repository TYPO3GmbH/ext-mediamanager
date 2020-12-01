import {
  customElement,
  html,
  internalProperty,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import { Typo3SvgTree } from './typo3-svg-tree';
import { Typo3Node } from './lib/typo3-node';
import * as d3 from 'd3';
import { D3DragEvent, DragBehavior } from 'd3';
import { Selection } from 'd3-selection';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { PropertyValues } from 'lit-element/lib/updating-element';

interface DragData {
  startPageX: number;
  startPageY: number;
  startDrag: boolean;
}

/* eslint-disable */
/**
 * @fires typo3-node-rename - Event fired on node rename
 * @fires typo3-node-add - Event fired on node add
 * @fires typo3-node-move - Event fired on node move
 */
@customElement('typo3-filetree')
export class Typo3Filetree extends Typo3SvgTree {
  @property({ type: Boolean }) editable = false;
  @property({ type: Boolean }) dragDropEnabled: boolean = false;

  @query('.node-dd') dragHandler!: HTMLEmbedElement;

  @internalProperty() isDragging = false;
  @internalProperty() allowDrop = false;

  protected clicks = 0;
  protected nodeIsEdit = false;
  private dragData!: DragData;

  constructor() {
    super();

    this.settings.showIcons = true;
    this.settings.defaultProperties = {
      hasChildren: false,
      nameSourceField: 'title',
      prefix: '',
      suffix: '',
      locked: false,
      loaded: false,
      overlayIcon: '',
      selectable: true,
      checked: false,
      backgroundColor: '',
      stopPageTree: false,
      class: '',
      readableRootline: '',
      isMountPoint: false,
    };
  }

  updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (
      _changedProperties.has('allowDrop') ||
      _changedProperties.has('isDragging')
    ) {
      this.container.classed(
        'nodes-wrapper--nodrop',
        this.isDragging && !this.allowDrop
      );
    }
  }

  render(): TemplateResult[] {
    return [super.render(), this.renderDragHandler()];
  }

  renderDragHandler(): TemplateResult {
    const draggedNode = this.draggedNode as Typo3Node;

    return html`
      <div
        class=${classMap({
          'node-dd': true,
          'node-dd--nodrop': !this.allowDrop,
          'node-dd--ok-append': this.allowDrop,
        })}
        style=${styleMap({
          display: this.isDragging ? 'block' : 'none',
        })}
      >
        ${!this.isDragging || !draggedNode
          ? html``
          : html` <div class="node-dd__ctrl-icon"></div>
              <div class="node-dd__text">
                <div class="node-dd__icon">
                  <svg width="16" height="16" role="img">
                    <use xlink:href="" />
                  </svg>
                </div>
                <span class="node-dd__name">${draggedNode.name}</span>
              </div>`}
      </div>
    `;
  }

  get draggedNode(): Typo3Node | null {
    return this.processedNodes.find(node => node._isDragged) ?? null;
  }

  addNode(parentNodeIdentifier: string): void {
    const parentNodeData = this.processedNodes.find(
      node => node.identifier === parentNodeIdentifier
    );

    if (!parentNodeData) {
      return;
    }
    const parentNode = this.svg.node()?.parentNode as SVGSVGElement;

    if (!parentNode) {
      return;
    }
    const newNode = {
      identifier: '-1',
      depth: parentNodeData.depth + 1,
      x: parentNodeData.x,
      y: parentNodeData.y,
    } as Typo3Node;

    const index = this.processedNodes.indexOf(parentNodeData) + 1;

    const removeNode = (newNode: Typo3Node): void => {
      const index = this.nodes.indexOf(newNode);

      // if newNode is only one child
      if (
        this.nodes[index - 1].depth != newNode.depth &&
        (!this.nodes[index + 1] || this.nodes[index + 1].depth != newNode.depth)
      ) {
        this.nodes[index - 1].hasChildren = false;
      }

      this.nodes.splice(index, 1);
      this._setParametersNode(this.nodes);
      this._prepareDataForVisibleNodes();
      this._update();
      this._removeEditedText();
      this.nodeIsEdit = true;
    };

    if (false === this._isNodeExpanded(parentNodeData)) {
      this._showChildren(parentNodeData);
    }

    const parentNodeWrapper = d3.select(parentNode) as Selection<
      SVGSVGElement,
      unknown,
      null,
      undefined
    >;

    this.nodes.splice(index, 0, newNode);
    this._setParametersNode(this.nodes);
    this._prepareDataForVisibleNodes();
    this._update();
    this._removeEditedText();
    this.nodeIsEdit = true;

    const self = this;

    const inputElement = parentNodeWrapper
      .append('input')
      .attr('class', 'node-edit')
      .style(
        'top',
        newNode.y + this.settings.nodeHeight + this.settings.marginTop + 'px'
      )
      .style('left', newNode.x + this.textPosition + 5 + 'px')
      .style(
        'width',
        this.settings.width - (newNode.x + this.textPosition + 20) + 'px'
      )
      .style('height', this.settings.nodeHeight + 'px')
      .attr('type', 'text')
      .attr('value', newNode.name)
      .on('keydown', function (event: KeyboardEvent) {
        const code = event.keyCode;
        if (code === 13 || code === 9) {
          //enter || tab
          const newName = this.value.trim();
          if (newName.length) {
            self.nodeIsEdit = false;
            self._removeEditedText();
            newNode.name = newName;
            newNode.nameSourceField = newNode.nameSourceField || 'title';
            self._sendAddNodeCommand(newNode, parentNodeData);
          } else {
            self.nodeIsEdit = false;
            self._removeEditedText();
          }
        } else if (code === 27) {
          //esc
          self.nodeIsEdit = false;
          removeNode(newNode);
        }
      })
      .on('blur', function () {
        if (self.nodeIsEdit) {
          const newName = this.value.trim();

          if (newName.length) {
            self._removeEditedText();
            newNode.name = newName;
            newNode.nameSourceField = newNode.nameSourceField || 'title';
            self._sendAddNodeCommand(newNode, parentNodeData);
          } else {
            removeNode(newNode);
          }
        }
      })
      .node();

    (inputElement as HTMLInputElement).select();
  }

  _selectNode(node: Typo3Node): void {
    this._getSelectedNodes()
      .filter(node => node.checked)
      .forEach(node => (node.checked = false));

    super._selectNode(node);
  }

  _clickOnLabel(node: Typo3Node): void {
    this.clicks += 1;
    if (node.identifier === '0') {
      super._clickOnLabel(node);
      return;
    }

    if (this.clicks === 1) {
      setTimeout(() => {
        if (this.clicks === 1) {
          super._clickOnLabel(node);
        } else {
          this._editNodeLabel(node);
        }
        this.clicks = 0;
      }, 300);
    }
  }

  _editNodeLabel(node: Typo3Node): void {
    const self = this;

    if (!node.allowEdit || !self.editable) {
      return;
    }
    const parentNode = this.svg.node()?.parentNode as SVGSVGElement;

    if (!parentNode) {
      return;
    }

    this._removeEditedText();
    this.nodeIsEdit = true;

    const parentNodeWrapper = d3.select(parentNode) as Selection<
      SVGSVGElement,
      unknown,
      null,
      undefined
    >;

    const inputElement = parentNodeWrapper
      .append('input')
      .attr('class', 'node-edit')
      .style('top', () => {
        const top = node.y + this.settings.marginTop;
        return top + 'px';
      })
      .style('left', node.x + this.textPosition + 5 + 'px')
      .style(
        'width',
        this.settings.width - (node.x + this.textPosition + 20) + 'px'
      )
      .style('height', this.settings.nodeHeight + 'px')
      .attr('type', 'text')
      .attr('value', node.name)
      .on('keydown', function (event: KeyboardEvent) {
        const code = event.keyCode;
        if (code === 13 || code === 9) {
          //enter || tab
          const newName = this.value.trim();

          if (newName.length && newName !== node.name) {
            self.nodeIsEdit = false;
            self._removeEditedText();
            node.nameSourceField = node.nameSourceField || 'title';
            self._sendEditNodeLabelCommand(node, newName);
          } else {
            self.nodeIsEdit = false;
            self._removeEditedText();
          }
        } else if (code === 27) {
          //esc
          self.nodeIsEdit = false;
          self._removeEditedText();
        }
      })
      .on('blur', function () {
        if (self.nodeIsEdit) {
          const newName = this.value.trim();

          if (newName.length && newName !== node.name) {
            node.nameSourceField = node.nameSourceField || 'title';
            self._sendEditNodeLabelCommand(node, newName);
          }
          self._removeEditedText();
        }
      })
      .node();

    (inputElement as HTMLInputElement).select();
  }

  _removeEditedText(): void {
    const inputWrapper = this.d3Wrapper.selectAll('.node-edit');
    if (inputWrapper.size()) {
      try {
        inputWrapper.remove();
        this.nodeIsEdit = false;
      } catch (e) {
        // do nothing
      }
    }
  }

  _sendEditNodeLabelCommand(node: Typo3Node, newName: string): void {
    this.dispatchEvent(
      new CustomEvent('typo3-node-rename', {
        detail: {
          node: node,
          name: newName,
        },
      })
    );
  }

  _sendAddNodeCommand(node: Typo3Node, parentNode: Typo3Node): void {
    this.dispatchEvent(
      new CustomEvent('typo3-node-add', {
        detail: {
          node: node,
          parentNode: parentNode,
        },
      })
    );
  }

  // todo use decorator draggable treee etc.

  _nodesUpdate(nodes: any): any {
    const processNodes = super._nodesUpdate(nodes);

    if (this.dragDropEnabled) {
      processNodes.call(this._getDragBehavior());
    }

    return processNodes;
  }

  _updateNodeBgClass(nodes: any): any {
    const processNodes = super._updateNodeBgClass(nodes);
    if (this.dragDropEnabled) {
      processNodes.call(this._getDragBehavior());
    }
    return processNodes;
  }

  _getDragBehavior(): DragBehavior<any, any, any> {
    // @ts-ignore
    return d3
      .drag()
      .clickDistance(5)
      .on('start', event => this.dragStart(event))
      .on('drag', (event: D3DragEvent<any, any, any>, node: Typo3Node) =>
        this.dragDragged(event, node)
      )
      .on('end', (event: D3DragEvent<any, any, any>, node: Typo3Node) =>
        this.dragEnd(event, node)
      );
  }

  dragStart(event: D3DragEvent<any, any, any>): void {
    this.isDragging = false;

    this.dragData = {
      startPageX: event.sourceEvent.pageX,
      startPageY: event.sourceEvent.pageY,
      startDrag: false,
    };
  }

  dragDragged(event: D3DragEvent<any, any, any>, node: Typo3Node): boolean {
    if (0 === node.depth) {
      return false;
    }

    if (this.isDragNodeDistanceMore(event, this.dragData, 10)) {
      this.dragData.startDrag = true;
    } else {
      return false;
    }
    if (!node._isDragged) {
      node._isDragged = true;
    }

    this.isDragging = true;
    this.inDropMode = true;

    let left = 10;
    let top = 15;

    if (event.sourceEvent && event.sourceEvent.pageX) {
      left += event.sourceEvent.pageX;
    }

    if (event.sourceEvent && event.sourceEvent.pageY) {
      top += event.sourceEvent.pageY;
    }

    this.dragHandler.style.left = left + 'px';
    this.dragHandler.style.top = top + 'px';
    // setting xlink:href via template has no effect
    const useElement = this.dragHandler.querySelector('use');
    useElement!.setAttribute(
      'xlink:href',
      this._getIconId(this.draggedNode as Typo3Node)
    );
    this.allowDrop = !node.isOver && this.isOverSvg;
  }

  dragEnd(event: D3DragEvent<any, any, any>, node: Typo3Node): boolean {
    this.inDropMode = false;
    document.body.style.pointerEvents = 'auto';

    if (
      !this.dragData.startDrag ||
      this.dragDropEnabled !== true ||
      node.depth === 0
    ) {
      return false;
    }

    this.isDragging = false;
    node._isDragged = false;
    this.inDropMode = false;

    if (node.isOver) {
      return false;
    }

    const target = this._getHoveredNode();
    if (!target) {
      return false;
    }

    this.dispatchEvent(
      new CustomEvent('typo3-node-move', {
        detail: {
          event: event,
          node: node,
          target: target,
        },
      })
    );

    return true;
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
}
