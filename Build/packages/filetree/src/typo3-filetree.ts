import { customElement, property } from 'lit-element';

import { Typo3SvgTree } from './typo3-svg-tree';
import { Typo3Node } from './lib/typo3-node';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

/* eslint-disable */
/**
 * @fires typo3-node-rename - Event fired on node rename
 * @fires typo3-node-add - Event fired on node add
 */
@customElement('typo3-filetree')
export class Typo3Filetree extends Typo3SvgTree {
  @property({ type: Boolean }) editable = false;

  protected clicks = 0;
  protected nodeIsEdit = false;

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
}
