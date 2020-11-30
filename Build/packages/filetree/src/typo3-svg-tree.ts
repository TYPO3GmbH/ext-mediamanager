import { html, LitElement, property, query, TemplateResult } from 'lit-element';

import { Selection } from 'd3-selection';
import * as d3 from 'd3';
import { Dispatch, HierarchyPointNode } from 'd3';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-filetree.pcss';
import { Typo3Node } from './lib/typo3-node';
import { PropertyValues } from 'lit-element/lib/updating-element';

interface Icon {
  identifier: string;
  icon: string;
}

/* eslint-disable */

/**
 * @fires typo3-node-select - Event fired on node selection
 * @fires typo3-node-expand - Event fired on node expand
 * @fires typo3-node-collapse - Event fired on node expand
 * @fires typo3-node-contextmenu - Event fired on contextmenu for node
 * @fires typo3-node-drop - Event fired on dropping element to node
 */
export class Typo3SvgTree extends LitElement {
  @property({ type: Array }) nodes: Typo3Node[] = [];

  @property({ type: Array }) expandedNodeIds: string[] = [];

  @property({ type: Boolean }) inDropMode = false;

  @query('.svg-tree-wrapper') wrapper!: HTMLElement;
  @query('.node-loader') nodeLoader!: HTMLElement;
  @query('.svg-tree-loader') svgTreeLoader!: HTMLElement;
  @query('.svg-toolbar') svgToolbar!: HTMLElement;

  protected d3Wrapper!: Selection<HTMLElement, unknown, null, undefined>;
  protected svg!: Selection<SVGSVGElement, unknown, null, undefined>;
  protected container!: Selection<SVGGElement, unknown, null, undefined>;
  protected nodesBgContainer!: Selection<SVGGElement, unknown, null, undefined>;
  protected linksContainer!: Selection<SVGGElement, unknown, null, undefined>;
  protected nodesContainer!: Selection<SVGGElement, unknown, null, undefined>;
  protected exclusiveSelectedNode: Typo3Node | null = null;

  protected processedNodes: Typo3Node[] = [];

  protected viewportHeight!: number;

  protected data: {
    nodes: Typo3Node[];
    links: { source: Typo3Node; target: Typo3Node }[];
    icons: { [key: string]: Icon };
  } = {
    nodes: [],
    links: [],
    icons: {},
  };

  protected isOverSvg = false;

  protected dispatch!: Dispatch<object>;

  protected settings = {
    showCheckboxes: false,
    showIcons: false,
    marginTop: 15,
    nodeHeight: 20,
    indentWidth: 16,
    width: 300,
    duration: 400,
    dataUrl: '',
    validation: {
      maxItems: Number.MAX_VALUE,
    },
    defaultProperties: {},
    unselectableElements: [] as string[],
    expandUpToLevel: null,
    readOnlyMode: false,
    /**
     * List node identifiers which can not be selected together with any other node
     */
    exclusiveNodesIdentifiers: '',
  };

  protected textPosition!: number;
  protected scrollBottom!: number;

  public static styles = [themeStyles, styles];

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this._setWrapperHeight);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._setWrapperHeight);
  }

  firstUpdated(): void {
    this._setWrapperHeight();
    this.dispatch = d3.dispatch(
      'updateNodes',
      'updateSvg',
      'loadDataAfter',
      'prepareLoadedNode',
      'nodeSelectedAfter',
      'nodeRightClick',
      'contextmenu'
    );

    this.d3Wrapper = d3.select(this.wrapper);

    this.svg = this.d3Wrapper
      .append('svg')
      .attr('version', '1.1')
      .attr('width', '100%')
      .on('mouseover', () => {
        this.isOverSvg = true;
      })
      .on('mouseout', () => {
        this.isOverSvg = false;
      });
    // todo add handleKeyboardInteraction

    this.container = this.svg
      .append('g')
      .attr('class', 'nodes-wrapper')
      .attr(
        'transform',
        'translate(' +
          this.settings.indentWidth / 2 +
          ',' +
          this.settings.nodeHeight / 2 +
          ')'
      );

    this.nodesBgContainer = this.container
      .append('g')
      .attr('class', 'nodes-bg');

    this.linksContainer = this.container.append('g').attr('class', 'links');

    this.nodesContainer = this.container
      .append('g')
      .attr('class', 'nodes')
      .attr('role', 'tree');

    this._updateScrollPosition();
  }

  updated(_changedProperties: PropertyValues): void {
    super.update(_changedProperties);
    if (_changedProperties.has('nodes')) {
      this._nodesAddPlaceholder();
      this._replaceData(this.nodes);
      this._nodesRemovePlaceholder();
    }
    if (_changedProperties.has('inDropMode')) {
      this.container.classed('nodes-wrapper--dragging', this.inDropMode);
    }
  }

  render(): TemplateResult {
    return html`
      <div id="typo3-filetree" class="svg-tree">
        <div>
          <div id="typo3-pagetree-treeContainer">
            <div id="typo3-pagetree-tree" class="svg-tree-wrapper">
              <div class="node-loader"></div>
            </div>
          </div>
        </div>
        <div class="svg-tree-loader"></div>
      </div>
    `;
  }

  _setWrapperHeight = (): void => {
    this.wrapper.style.height = this.offsetHeight + 'px';
  };

  /**
   * Updates variables used for visible nodes calculation
   */
  _updateScrollPosition(): void {
    // todo handle svg-toolbar & scaffold-topbar
    this.viewportHeight = this.wrapper.clientHeight;
    this.scrollBottom =
      this.scrollTop + this.viewportHeight + this.viewportHeight / 2;
  }

  _nodesAddPlaceholder(node?: HierarchyPointNode<unknown>): void {
    if (node) {
      this.nodeLoader.style.top = node.y + this.settings.marginTop + 'px';
      this.nodeLoader.style.display = 'block';
    } else {
      this.svgTreeLoader.style.display = 'block';
    }
  }

  _nodesRemovePlaceholder(): void {
    this.nodeLoader.style.display = 'none';
    this.svgTreeLoader.style.display = 'none';
  }

  _replaceData(nodes: Typo3Node[]): void {
    this._setParametersNode(nodes);
    this.dispatch.call('loadDataAfter', this);

    this._prepareDataForVisibleNodes();
    this.nodesContainer.selectAll('.node').remove();
    this.nodesBgContainer.selectAll('.node-bg').remove();
    this.linksContainer.selectAll('.link').remove();
    this._update();
  }

  /**
   * Set parameters like node parents, parentsStateIdentifier, checked
   *
   * @param {Typo3Node[]} nodes
   */
  _setParametersNode(nodes: Typo3Node[]) {
    nodes = nodes.map((node, index) => {
      if (typeof node.command === 'undefined') {
        node = Object.assign({}, this.settings.defaultProperties, node);
      }
      node.parents = [];
      node.parentsStateIdentifier = [];
      node._isDragged = false;
      if (node.depth > 0) {
        let currentDepth = node.depth;
        for (let i = index; i >= 0; i--) {
          const currentNode = nodes[i];
          if (currentNode.depth < currentDepth) {
            node.parents.push(i);
            node.parentsStateIdentifier.push(nodes[i].stateIdentifier);
            currentDepth = currentNode.depth;
          }
        }
      }

      node.canToggle = node.hasChildren;

      // create stateIdentifier if doesn't exist (for category tree)
      if (!node.stateIdentifier) {
        const parentId = node.parents.length
          ? node.parents[node.parents.length - 1]
          : node.identifier;
        node.stateIdentifier = parentId + '_' + node.identifier;
      }

      if (typeof node.checked === 'undefined') {
        node.checked = false;
      }
      if (node.selectable === false) {
        this.settings.unselectableElements.push(node.identifier);
      }

      // dispatch event
      this.dispatch.call('prepareLoadedNode', this, node);
      return node;
    });

    // get nodes with depth 0, if there is only 1 then open it and disable toggle
    const nodeDepths = nodes.filter(node => {
      return node.depth === 0;
    });

    if (nodeDepths.length === 1) {
      nodes[0].canToggle = false;
    }

    this.processedNodes = nodes;
  }

  _prepareDataForVisibleNodes(): void {
    const blacklist: { [key: string]: boolean } = {};
    this.processedNodes.map((node, index) => {
      if (!this._isNodeExpanded(node)) {
        blacklist[index] = true;
      }
    });

    this.data.nodes = this.processedNodes.filter(node => {
      return (
        node.hidden !== true &&
        !node.parents.some(index => {
          return Boolean(blacklist[index]);
        })
      );
    });

    this.data.links = [];
    let pathAboveMounts = 0;

    this.data.nodes.forEach((n, i) => {
      // delete n.children;
      n.x = n.depth * this.settings.indentWidth;

      if (n.readableRootline) {
        pathAboveMounts += this.settings.nodeHeight;
      }

      n.y = i * this.settings.nodeHeight + pathAboveMounts;
      if (n.parents[0] !== undefined) {
        this.data.links.push({
          source: this.processedNodes[n.parents[0]],
          target: n,
        });
      }

      if (this.settings.showIcons) {
        this._fetchIcon(n.icon);
        this._fetchIcon(n.overlayIcon);
        if (n.locked) {
          this._fetchIcon('warning-in-use');
        }
      }
    });

    this.svg.attr(
      'height',
      this.data.nodes.length * this.settings.nodeHeight +
        this.settings.nodeHeight / 2 +
        pathAboveMounts
    );
  }

  _fetchIcon(iconName: string, update = true) {
    // todo fix icon handling
    return;
  }

  /**
   * Renders the subset of the tree nodes fitting the viewport (adding, modifying and removing SVG nodes)
   */
  _update(): void {
    const visibleRows = Math.ceil(
      this.viewportHeight / this.settings.nodeHeight + 1
    );
    const position = Math.floor(
      Math.max(this.scrollTop - this.settings.nodeHeight * 2, 0) /
        this.settings.nodeHeight
    );

    const visibleNodes = this.data.nodes.slice(
      position,
      position + visibleRows
    );
    const focusableElement = this.wrapper.querySelector('[tabindex="0"]');
    const checkedNodeInViewport = visibleNodes.find(function (node) {
      return node.checked;
    });
    let nodes = this.nodesContainer
      .selectAll('.node')
      .data(visibleNodes, d => d.stateIdentifier);
    const nodesBg = this.nodesBgContainer
      .selectAll('.node-bg')
      .data(visibleNodes, d => d.stateIdentifier);

    // delete nodes without corresponding data
    nodes.exit().remove();

    // delete
    nodesBg.exit().remove();

    // update nodes background
    const nodeBgClass = this._updateNodeBgClass(nodesBg);

    nodeBgClass
      .attr('class', (node: Typo3Node, i: number) => {
        return this._getNodeBgClass(node, i, nodeBgClass);
      })
      .attr('style', (node: any) => {
        return node.backgroundColor
          ? 'fill: ' + node.backgroundColor + ';'
          : '';
      });

    this._updateLinks();
    nodes = this._enterSvgElements(nodes);

    // update nodes
    nodes
      .attr('tabindex', function (node, index) {
        if (typeof checkedNodeInViewport !== 'undefined') {
          if (checkedNodeInViewport === node) {
            return '0';
          }
        } else {
          if (focusableElement === null) {
            if (index === 0) {
              return '0';
            }
          } else {
            if (d3.select(focusableElement).datum() === node) {
              return '0';
            }
          }
        }
        return '-1';
      })
      .attr('transform', this._getNodeTransform)
      .select('.node-name')
      .text(this._getNodeLabel);

    nodes
      .select('.chevron')
      .attr('transform', node => this._getChevronTransform(node))
      .style('fill', node => this._getChevronColor(node))
      .attr('class', node => this._getChevronClass(node));

    nodes
      .select('.toggle')
      .attr('visibility', node => this._getToggleVisibility(node));

    if (this.settings.showIcons) {
      nodes
        .select('use.node-icon')
        .attr('xlink:href', this._getIconId)
        .attr('width', '16px')
        .attr('height', '16px');

      nodes
        .select('use.node-icon-overlay')
        .attr('xlink:href', this._getIconOverlayId);
      nodes.select('use.node-icon-locked').attr('xlink:href', node => {
        return '#icon-' + (node.locked ? 'warning-in-use' : '');
      });
    }
    // dispatch event
    this.dispatch.call('updateNodes', this, nodes);
  }

  /**
   * @param {Typo3Node} nodesBg
   * @returns {Typo3Node} nodesBg
   */
  _updateNodeBgClass(
    nodesBg: Selection<SVGRectElement, unknown, null, undefined>
  ) {
    return nodesBg
      .enter()
      .append('rect')
      .merge(nodesBg)
      .attr('width', '100%')
      .attr('height', this.settings.nodeHeight)
      .attr('data-state-id', this._getNodeStateIdentifier)
      .attr('transform', this._getNodeBgTransform)
      .on('mouseover', (_, node) => {
        this._nodeBgEvents().mouseOver(node, this);
      })
      .on('mouseout', (_, node) => {
        this._nodeBgEvents().mouseOut(node, this);
      })
      .on('click', (_, node) => {
        this._selectNode(node);
        // todo implement
        this._switchFocusNode(node);
      })
      .on('contextmenu', (event, node) => {
        this._onContextmenu(event, node);
      });
  }

  /**
   * node background events
   *
   */
  _nodeBgEvents() {
    const self: { [key: string]: Function } = {};

    self.mouseOver = (node: Typo3Node) => {
      const elementNodeBg = this.svg.select(
        '.nodes-bg .node-bg[data-state-id="' + node.stateIdentifier + '"]'
      );
      node.isOver = true;

      if (elementNodeBg.size()) {
        elementNodeBg
          .classed('node-over', true)
          .attr('rx', '3')
          .attr('ry', '3');
      }
    };

    self.mouseOut = (node: Typo3Node) => {
      const elementNodeBg = this.svg.select(
        '.nodes-bg .node-bg[data-state-id="' + node.stateIdentifier + '"]'
      );

      node.isOver = false;
      if (elementNodeBg.size()) {
        elementNodeBg
          .classed('node-over node-alert', false)
          .attr('rx', '0')
          .attr('ry', '0');
      }
    };

    return self;
  }

  /**
   * Renders links(lines) between parent and child nodes and is also used for grouping the children
   * The line element of the first child is used as role=group node to group the children programmatically
   */
  _updateLinks() {
    const visibleLinks = this.data.links.filter(linkData => {
      return (
        linkData.source.y <= this.scrollBottom &&
        linkData.target.y >= this.scrollTop - this.settings.nodeHeight
      );
    });
    visibleLinks.forEach(link => {
      link.source.owns = link.source.owns || [];
      link.source.owns.push('identifier-' + link.target.stateIdentifier);
    });

    const links = this.linksContainer.selectAll('.link').data(visibleLinks);

    // delete
    links.exit().remove();

    // create
    links
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('id', this._getGroupIdentifier)
      .attr('role', link => {
        return link.target.siblingsPosition === 1 && link.source.owns.length > 0
          ? 'group'
          : null;
      })
      .attr('aria-owns', link => {
        return link.target.siblingsPosition === 1 && link.source.owns.length > 0
          ? link.source.owns.join(' ')
          : null;
      })

      // create + update
      .merge(links)
      .attr('d', this._getLinkPath.bind(this));
  }

  /**
   * If the link target is the first child, set the group identifier.
   * The group with this id is used for grouping the siblings, thus the identifier uses the stateIdentifier of
   * the link source item.
   */
  _getGroupIdentifier(link: any) {
    return link.target.siblingsPosition === 1
      ? 'group-identifier-' + link.source.stateIdentifier
      : null;
  }

  /**
   * Adds missing SVG nodes
   *
   * @param {Selection} nodes
   * @returns {Selection}
   */
  _enterSvgElements(nodes: any): Selection<any, any, any, any> {
    this.textPosition = 10;

    // create the node elements
    const nodeEnter = this._nodesUpdate(nodes);

    // append the chevron element
    const chevron = nodeEnter
      .append('g')
      .attr('class', 'toggle')
      .attr('visibility', this._getToggleVisibility)
      .attr('transform', 'translate(-8, -8)')
      .on('click', (_, node: Typo3Node) => {
        this._chevronClick(node);
      });

    // improve usability by making the click area a 16px square
    chevron
      .append('path')
      .style('opacity', 0)
      .attr('d', 'M 0 0 L 16 0 L 16 16 L 0 16 Z');
    chevron
      .append('path')
      .attr('class', 'chevron')
      .attr('d', 'M 4 3 L 13 8 L 4 13 Z');

    // append the icon element
    if (this.settings.showIcons) {
      this.textPosition = 30;

      const nodeContainer = nodeEnter
        .append('g')
        .attr('class', 'node-icon-container')
        .attr('title', this._getNodeTitle)
        .attr('data-toggle', 'tooltip')
        .on('click', (_, node: Typo3Node) => {
          this._clickOnIcon(node, this);
        });

      nodeContainer
        .append('use')
        .attr('class', 'node-icon')
        .attr('data-uid', this._getNodeIdentifier)
        .attr('transform', 'translate(8, -8)');

      nodeContainer
        .append('use')
        .attr('transform', 'translate(8, -3)')
        .attr('class', 'node-icon-overlay');

      nodeContainer
        .append('use')
        .attr('x', 27)
        .attr('y', -7)
        .attr('class', 'node-icon-locked');
    }

    /**
     * todo handle tooltip
     Tooltip.initialize('[data-toggle="tooltip"]', {
      delay: {
        "show": 50,
        "hide": 50
      }
      trigger: 'hover',
      container: 'body',
      placement: 'right',
    });
     **/

    this.dispatch.call('updateSvg', this, nodeEnter);

    this._appendTextElement(nodeEnter);

    return nodes.merge(nodeEnter);
  }

  /**
   * append the text element
   *
   * @param {Typo3Node} node
   * @returns {Typo3Node} node
   */
  _appendTextElement(node: any): any {
    return node
      .append('text')
      .attr('dx', node => {
        return this.textPosition + (node.locked ? 15 : 0);
      })
      .attr('dy', 5)
      .attr('class', 'node-name')
      .on('click', (_, node) => {
        this._clickOnLabel(node);
      });
  }

  /**
   * @param {Typo3Node} nodes
   * @returns {Typo3Node} nodes
   */
  _nodesUpdate(nodes: any): any {
    nodes = nodes
      .enter()
      .append('g')
      .attr('class', this._getNodeClass)
      .attr('id', (node: Typo3Node) => {
        return 'identifier-' + node.stateIdentifier;
      })
      .attr('role', 'treeitem')
      .attr('aria-owns', (node: Typo3Node) => {
        return node.hasChildren
          ? 'group-identifier-' + node.stateIdentifier
          : null;
      })
      .attr('aria-level', this._getNodeDepth)
      .attr('aria-setsize', this._getNodeSetsize)
      .attr('aria-posinset', this._getNodePositionInSet)
      .attr('aria-expanded', (node: Typo3Node) => {
        return node.hasChildren ? this._isNodeExpanded(node) : null;
      })
      .attr('transform', this._getNodeTransform)
      .attr('data-state-id', this._getNodeStateIdentifier)
      .attr('title', this._getNodeTitle)
      .on('mouseover', (_, node: Typo3Node) => {
        this._nodeBgEvents().mouseOver(node, this);
      })
      .on('mouseout dragleave', (_, node: Typo3Node) => {
        this._nodeBgEvents().mouseOut(node, this);
      })
      .on('contextmenu', (event: MouseEvent, node: Typo3Node) => {
        this._onContextmenu(event, node);
      })
      .on('dragover', (event: DragEvent, node: Typo3Node) => {
        event.preventDefault();
        this._nodeBgEvents().mouseOver(node, this);
      })
      .on('drop', (event: DragEvent, node: Typo3Node) => {
        this._onNodeDrop(event, node);
      });

    nodes
      .append('text')
      .text((node: Typo3Node) => {
        return node.readableRootline;
      })
      .attr('class', 'node-rootline')
      .attr('dx', 0)
      .attr('dy', -15)
      .attr('visibility', (node: Typo3Node) => {
        return node.readableRootline ? 'visible' : 'hidden';
      });

    return nodes;
  }

  /**
   * Computes the tree item identifier based on the data
   *
   * @param {Typo3Node} node
   * @returns {String}
   */
  _getNodeIdentifier(node: Typo3Node): string {
    return node.identifier;
  }

  /**
   * Returns the depth of a node
   *
   * @param {Typo3Node} node
   * @returns {Number}
   */
  _getNodeDepth(node: Typo3Node): number {
    return node.depth;
  }

  _getNodeSetsize(node: Typo3Node): number {
    return node.siblingsCount;
  }

  _getNodePositionInSet(node: Typo3Node): number {
    return node.siblingsPosition;
  }

  /**
   * Computes the tree item state identifier based on the data
   */
  _getNodeStateIdentifier(node: Typo3Node): string {
    return node.stateIdentifier;
  }

  /**
   * Computes the tree item label based on the data
   */
  _getNodeLabel(node: Typo3Node): string {
    return (node.prefix || '') + node.name + (node.suffix || '');
  }

  /**
   * Computes the tree node class
   */
  _getNodeClass(node: Typo3Node): string {
    return 'node identifier-' + node.stateIdentifier;
  }

  /**
   * Computes the tree node-bg class
   */
  _getNodeBgClass(node: Typo3Node, i: number, nodeBgClass: any): string {
    let bgClass = 'node-bg';
    let prevNode: Typo3Node | null = null;
    let nextNode: Typo3Node | null = null;

    if (typeof nodeBgClass === 'object') {
      prevNode = nodeBgClass.data()[i - 1];
      nextNode = nodeBgClass.data()[i + 1];
    }

    if (node.checked) {
      bgClass += ' node-selected';
    }

    if ((prevNode && node.depth > prevNode.depth) || !prevNode) {
      node.firstChild = true;
      bgClass += ' node-firth-child';
    }

    if ((nextNode && node.depth > nextNode.depth) || !nextNode) {
      node.lastChild = true;
      bgClass += ' node-last-child';
    }

    if (node.class) {
      bgClass += ' ' + node.class;
    }

    return bgClass;
  }

  /**
   * Computes the tree item label based on the data
   */
  _getNodeTitle(node: Typo3Node): string {
    return node.tip ? node.tip : 'uid=' + node.identifier;
  }

  /**
   * Returns chevron 'transform' attribute value
   */
  _getChevronTransform(node: Typo3Node): string {
    return this._isNodeExpanded(node)
      ? 'translate(16,0) rotate(90)'
      : ' rotate(0)';
  }

  /**
   * Returns chevron class
   */
  _getChevronColor(node: Typo3Node): string {
    return this._isNodeExpanded(node) ? '#000' : '#8e8e8e';
  }

  /**
   * Computes toggle 'visibility' attribute value
   */
  _getToggleVisibility(node: Typo3Node): string {
    return node.canToggle ? 'visible' : 'hidden';
  }

  /**
   * Computes chevron 'class' attribute value
   */
  _getChevronClass(node: Typo3Node): string {
    return 'chevron ' + (this._isNodeExpanded(node) ? 'expanded' : 'collapsed');
  }

  /**
   * Returns icon's href attribute value
   */
  _getIconId(node: Typo3Node): string {
    return node.icon;
  }

  /**
   * Returns icon's href attribute value
   */
  _getIconOverlayId(node: Typo3Node): string {
    return '#icon-' + node.overlayIcon;
  }

  /**
   * Returns a SVG path's 'd' attribute value
   */
  _getLinkPath(link: any): string {
    const target: any = {
      x: link.target._isDragged ? link.target._x : link.target.x,
      y: link.target._isDragged ? link.target._y : link.target.y,
    };
    const path = [];
    path.push('M' + link.source.x + ' ' + link.source.y);
    path.push('V' + target.y);
    if (target.hasChildren) {
      path.push('H' + (target.x - 2));
    } else {
      path.push('H' + (target.x + this.settings.indentWidth / 4 - 2));
    }

    return path.join(' ');
  }

  /**
   * Returns a 'transform' attribute value for the tree element (absolute positioning)
   */
  _getNodeTransform(node: Typo3Node): string {
    return 'translate(' + (node.x || 0) + ',' + (node.y || 0) + ')';
  }

  /**
   * Returns a 'transform' attribute value for the node background element (absolute positioning)
   */
  _getNodeBgTransform(node: Typo3Node): string {
    return 'translate(-8, ' + ((node.y || 0) - 10) + ')';
  }

  /**
   * Node selection logic (triggered by different events)
   */
  _selectNode(node: Typo3Node): void {
    if (!this._isNodeSelectable(node)) {
      return;
    }

    const checked = node.checked;
    this._handleExclusiveNodeSelection(node);

    if (this.settings.validation && this.settings.validation.maxItems) {
      const selectedNodes = this._getSelectedNodes();
      if (
        !checked &&
        selectedNodes.length >= this.settings.validation.maxItems
      ) {
        return;
      }
    }

    node.checked = !checked;

    this.dispatchEvent(
      new CustomEvent('typo3-node-select', {
        detail: node,
      })
    );

    this.dispatch.call('nodeSelectedAfter', this, node);
    this._update();
  }

  /**
   * Handle exclusive nodes functionality
   * If a node is one of the exclusiveNodesIdentifiers list,
   * all other nodes has to be unselected before selecting this node.
   */
  _handleExclusiveNodeSelection(node: Typo3Node): void {
    const exclusiveKeys = this.settings.exclusiveNodesIdentifiers.split(',');
    if (
      this.settings.exclusiveNodesIdentifiers.length &&
      node.checked === false
    ) {
      if (exclusiveKeys.indexOf('' + node.identifier) > -1) {
        // this key is exclusive, so uncheck all others
        this.processedNodes.forEach(node => {
          if (node.checked === true) {
            node.checked = false;
            this.dispatch.call('nodeSelectedAfter', this, node);
          }
        });

        this.exclusiveSelectedNode = node;
      } else if (
        exclusiveKeys.indexOf('' + node.identifier) === -1 &&
        this.exclusiveSelectedNode
      ) {
        // current node is not exclusive, but other exclusive node is already selected
        this.exclusiveSelectedNode.checked = false;
        this.dispatch.call(
          'nodeSelectedAfter',
          this,
          this.exclusiveSelectedNode
        );
        this.exclusiveSelectedNode = null;
      }
    }
  }

  /**
   * Check whether node can be selected.
   * In some cases (e.g. selecting a parent) it should not be possible to select
   * element (as it's own parent).
   *
   */
  _isNodeSelectable(node: Typo3Node): boolean {
    return (
      !this.settings.readOnlyMode &&
      this.settings.unselectableElements.indexOf(node.identifier) === -1
    );
  }

  _isNodeExpanded(node: Typo3Node): boolean {
    return this.expandedNodeIds.indexOf(node.identifier) != -1;
  }

  /**
   * Returns an array of selected nodes
   */
  _getSelectedNodes(): Typo3Node[] {
    return this.processedNodes.filter(node => {
      return node.checked;
    });
  }

  /**
   * Event handler for clicking on a node's icon
   */
  _clickOnIcon(node: Typo3Node, element: HTMLElement): void {
    this.dispatch.call('contextmenu', node, element);
  }

  /**
   * Event handler for click on a node's label/text
   */
  _clickOnLabel(node: Typo3Node): void {
    this._selectNode(node);
  }

  /**
   * Event handler for click on a chevron
   */
  _chevronClick(node: Typo3Node): void {
    if (this._isNodeExpanded(node)) {
      this._hideChildren(node);
    } else {
      this._showChildren(node);
    }

    this._prepareDataForVisibleNodes();
    this._update();
  }

  /**
   * Updates node's data to hide/collapse children
   */
  _hideChildren(node: Typo3Node): void {
    this.expandedNodeIds = this.expandedNodeIds.filter(
      nodeId => nodeId != node.identifier
    );

    this.dispatchEvent(
      new CustomEvent('typo3-node-collapse', { detail: node })
    );

    this._setExpandedState(node);
  }

  /**
   * Updates node's data to show/expand children
   */
  _showChildren(node: Typo3Node): void {
    this.expandedNodeIds.push(node.identifier);
    this.dispatchEvent(new CustomEvent('typo3-node-expand', { detail: node }));
    this._setExpandedState(node);
  }

  /**
   * Updates the expanded state of the DOM element that belongs to the node.
   * This is required because the node is not recreated on update and thus the change in the expanded state
   * of the node data is not represented in DOM on hideChildren and showChildren.
   */
  _setExpandedState(node: Typo3Node): void {
    const nodeElement = this.shadowRoot!.querySelector(
      '#identifier-' + this._getNodeStateIdentifier(node)
    );
    if (nodeElement) {
      nodeElement.toggleAttribute(
        'aria-expanded',
        node.hasChildren ? this._isNodeExpanded(node) : false
      );
    }
  }

  /**
   * Expand all nodes and refresh view
   */
  expandAll(): void {
    this.processedNodes.forEach(this._showChildren.bind(this));
    this._prepareDataForVisibleNodes();
    this._update();
  }

  /**
   * Collapse all nodes recursively and refresh view
   */
  collapseAll(): void {
    this.processedNodes.forEach(this._hideChildren.bind(this));
    this._prepareDataForVisibleNodes();
    this._update();
  }

  _switchFocusNode(node: Typo3Node): void {
    const nodeElement = this.querySelector(
      'identifier-' + this._getNodeStateIdentifier(node)
    ) as HTMLElement;
    this._switchFocus(nodeElement);
  }

  /**
   * Make the DOM element given as parameter focusable and focus it
   */
  _switchFocus(element: HTMLElement): void {
    if (element !== null) {
      const visibleElements = element.parentNode!.querySelectorAll(
        '[tabindex]'
      );
      visibleElements.forEach(visibleElement =>
        visibleElement.setAttribute('tabindex', '-1')
      );
      element.setAttribute('tabindex', '0');
      element.focus();
    }
  }

  _onContextmenu(event: MouseEvent, node: Typo3Node): void {
    this.dispatchEvent(
      new CustomEvent('typo3-node-contextmenu', {
        detail: {
          event: event,
          node: node,
        },
      })
    );
    this.dispatch.call('nodeRightClick', node, this);
  }

  private _onNodeDrop(event: DragEvent, node: Typo3Node): void {
    this.dispatchEvent(
      new CustomEvent('typo3-node-drop', {
        detail: {
          event: event,
          node: node,
        },
      })
    );
  }

  _getHoveredNode(): Typo3Node | null {
    return this.processedNodes.find(node => node.isOver) ?? null;
  }
}
