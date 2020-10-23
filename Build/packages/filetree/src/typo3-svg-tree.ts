import { html, LitElement, property, query, TemplateResult } from 'lit-element';

import { Selection } from 'd3-selection';
import * as d3 from 'd3';
import { Dispatch, HierarchyPointNode } from 'd3';
import themeStyles from '../../../theme/index.pcss';
import styles from './typo3-filetree.pcss';
import { Typo3Node } from './lib/typo3-node';
import { PropertyValues } from 'lit-element/lib/updating-element';
import { isEqual } from 'lodash-es';

interface Icon {
  identifier: string;
  icon: string;
}

/**
 * @fires typo3-node-selected - Event fired on node selction
 */
export class Typo3SvgTree extends LitElement {
  @property({
    type: Array,
    hasChanged(newNodes: Typo3Node[], oldNodes: Typo3Node[]): boolean {
      return (
        typeof oldNodes === 'undefined' ||
        !isEqual(
          oldNodes.map(node => node.identifier),
          newNodes.map(node => node.identifier)
        )
      );
    },
  })
  nodes: Typo3Node[] = [];

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

  protected _internalNodes: Typo3Node[] = [];

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
    nodeOver: {} as any,
    validation: {
      maxItems: Number.MAX_VALUE,
    },
    defaultProperties: {},
    unselectableElements: [] as any,
    expandUpToLevel: null,
    readOnlyMode: false,
    /**
     * List node identifiers which can not be selected together with any other node
     */
    exclusiveNodesIdentifiers: '',
  };

  private textPosition!: number;
  private scrollBottom!: number;

  public static styles = [themeStyles, styles];

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
      .on('mouseover', () => (this.isOverSvg = true))
      .on('mouseover', () => (this.isOverSvg = false));
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

      <svg style="display: none">
        <defs>
          <g class="icon-def" id="icon-apps-pagetree-page-default">
            <g xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path fill="#EFEFEF" d="M2 0v16h12V4l-4-4H2z"></path>
              <path opacity=".65" fill="#FFF" d="M10 3.98V0l4 4-4-.02z"></path>
              <path opacity=".2" d="M13 5v5L9 5h4z"></path>
              <path
                fill="#999"
                d="M2 0v16h12V4h-.012l.004-.008L10.008.006 10 .014V0H2zm1 1h6v4h4v10H3V1zm7 .412L12.586 4H10V1.412z"
              ></path>
            </g>
          </g>
          <g class="icon-def" id="icon-apps-pagetree-page-shortcut">
            <g xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path fill="#EFEFEF" d="M2 0v16h12V4l-4-4H2z"></path>
              <path opacity=".65" fill="#FFF" d="M10 4V0l4 4h-4z"></path>
              <path opacity=".2" d="M13 5v5L9 5h4z"></path>
              <path
                fill="#999"
                d="M2 0v16h12V4h-.012l.004-.008L10.008.006 10 .014V0H2zm1 1h6v4h4v10H3V1zm7 .412L12.586 4H10V1.412z"
              ></path>
              <g>
                <path fill="#666" d="M5 5h11v11H5z"></path>
                <path fill="#FFF" d="M6 6h9v9H6z"></path>
                <path d="M10 11H9v2H8v-3h2V8l4 2.5-4 2.5z"></path>
              </g>
            </g>
          </g>
          <g class="icon-def" id="icon-apps-pagetree-page-shortcut-external">
            <g xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#666"
                d="M11.733 1.412c-.615 0-1.23.236-1.701.707L8.044 4.107a2.4 2.4 0 0 0 0 3.403l.447.447a2.4 2.4 0 0 0 3.403 0l1.988-1.988a2.4 2.4 0 0 0 0-3.403l-.447-.447a2.404 2.404 0 0 0-1.702-.707zm-.182 1.121c.436-.022.936.18 1.336.58.64.64.771 1.538.295 2.016l-2.127 2.127c-.477.477-1.378.347-2.018-.293s-.77-1.539-.293-2.018l2.127-2.127c.179-.179.418-.272.68-.285zM5.808 7.336c-.615 0-1.23.236-1.701.707l-1.988 1.988a2.4 2.4 0 0 0 0 3.403l.447.447a2.4 2.4 0 0 0 3.403 0l1.988-1.988a2.4 2.4 0 0 0 0-3.403l-.447-.447a2.407 2.407 0 0 0-1.702-.707zm-.183 1.122c.436-.022.938.18 1.338.58.64.64.77 1.539.293 2.018l-2.127 2.127c-.477.477-1.376.345-2.016-.295s-.771-1.538-.295-2.016l2.127-2.127c.178-.179.418-.274.68-.287z"
              ></path>
              <path
                opacity=".3"
                d="M8.018 7.535l.447.447a2.39 2.39 0 0 0 1.201.65l1.316-1.316c-.487.429-1.35.293-1.971-.328.318-.207-1.145.201-.993.547zM7.515 8.047l.447.447c.343.343.557.762.65 1.201l-1.316 1.316c.429-.487.293-1.351-.328-1.971-.208.317.2-1.145.547-.993z"
              ></path>
              <path
                fill="#999"
                d="M5.002 9.458l4.463-4.463c.256-.256.809-.119 1.234.306.425.425.562.978.306 1.234l-4.463 4.463c-.256.256-.809.119-1.234-.306-.425-.425-.562-.978-.306-1.234z"
              ></path>
            </g>
          </g>
          <g class="icon-def" id="icon-apps-pagetree-folder-default">
            <g xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path fill="#AAA" d="M16 4v10H0V2h7l1.3 2H16z"></path>
              <path opacity=".43" d="M16 5H8.3L7 7H0V4h16v1z"></path>
            </g>
          </g>
          <g class="icon-def" id="icon-apps-pagetree-page-shortcut-root">
            <g xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <circle fill="#59F" cx="8" cy="8" r="8"></circle>
              <path
                fill="#AAD400"
                d="M14.973 7.378a7.034 7.034 0 0 0-3.545-5.48c-.092.097-.117.04-.117.137-.277.097-.646-.097-.923-.194a3.23 3.23 0 0 0-2.122-.097c-.277.097-.922.194-.646.776.184.292.645.583 1.107.195.184-.194.37-.485.645-.194.093.098.093.195.093.292-.093.29-.37.388-.646.388-.37.097-.74 0-1.108.097-.37.097-.923.194-.923.68 0 .58-.185.678-.647.775-.37 0-.553.194-.37.582.093.29.37.29.555.194.738-.388 1.384-1.358 2.214-.194l.184-.097c.185-.776.37-.29.554 0l.277.29c1.107-1.066.83.486 1.2.776-.74-.194-1.57.582-2.215.097-1.107-.872-1.845-.484-2.86.388-.83.68-1.015 1.552-.83 2.328.276.97 1.29 1.067 2.122.873.276-.098.83-.098.83.096-.185.873.83 1.455.46 2.424-.276.776.186 1.746.83 2.037.647.29 1.2-.485 1.478-1.164.092-.097 0-.29.092-.388.738-.97.646-2.424 1.568-3.394.277-.29 1.2-1.357.46-2.23 1.754-.485 1.11 1.26 1.478 2.037.276-.582.46-1.164.645-1.65.092-.29.16-.38.16-.38zM4.948 2.21c.29-.306.303-.356.594-.765a6.738 6.738 0 0 0-1.923 1.099l.168.177h.873s.097 0 .097-.1l.097-.103s.097 0 .097-.102l.096-.102.097-.103c-.29.205-.29.103-.194 0 0 .103 0 .103 0 0 0 .103 0 0 0 0l-.002-.001zM3.666 11.65s-.096-.092 0 0c-.096-.092-.096-.092 0 0v-.276l-.096-.092c-.095 0-.095-.093-.19-.093s-.19-.093-.286-.093h-.191s-.095 0-.095-.092c-.668-.37-.953-1.015-1.144-1.752 0-.185-.095-.37-.095-.554-.094-.093-.094-.185-.19-.278-.19-.184-.094-.553.096-.922v-.184c0-.093 0-.093.095-.185 0-.09 0-.09.096-.183.19-.37.572-.646.762-.923.095-.092.095-.092.095-.184v-.092c.095-.092.095-.277.19-.37 0-.09.096-.276.096-.368 0-.185 0-.277-.096-.46-.096-.278-.154-.518-.344-.703-.858 1.2-1.37 2.546-1.37 4.113 0 2.123.903 4.006 2.414 5.324 0 0 .061.026.061-.064v-.094c0-.092.095-.092.095-.184.096-.37.096-.922.097-1.291z"
              ></path>
              <path
                opacity=".2"
                d="M8 16c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM8 1C4.14 1 1 4.14 1 8c0 3.859 3.14 7 7 7 3.859 0 7-3.141 7-7 0-3.86-3.141-7-7-7z"
              ></path>
              <g>
                <path fill="#666" d="M5 5h11v11H5z"></path>
                <path fill="#FFF" d="M6 6h9v9H6z"></path>
                <path d="M10 11H9v2H8v-3h2V8l4 2.5-4 2.5z"></path>
              </g>
            </g>
          </g>
          <g class="icon-def" id="icon-apps-pagetree-page-hideinmenu">
            <g xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <g opacity=".5">
                <path fill="#EFEFEF" d="M2 0v16h12V4l-4-4H2z"></path>
                <path
                  opacity=".65"
                  fill="#FFF"
                  d="M10 3.98V0l4 4-4-.02z"
                ></path>
                <path opacity=".2" d="M13 5v5L9 5h4z"></path>
                <path
                  fill="#999"
                  d="M2 0v16h12V4h-.012l.004-.008L10.008.006 10 .014V0H2zm1 1h6v4h4v10H3V1zm7 .412L12.586 4H10V1.412z"
                ></path>
              </g>
            </g>
          </g>
        </defs>
      </svg>
    `;
  }

  _setWrapperHeight(): void {
    // currently obsolete
    // const height = window.innerHeight;
    // this.wrapper.style.height =
    //  height - this.svgToolbar.clientHeight - 5 + 'px';
  }

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
      node.expanded =
        this.settings.expandUpToLevel !== null
          ? node.depth < (this.settings.expandUpToLevel ?? 0)
          : Boolean(node.expanded);
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
      nodes[0].expanded = true;
      nodes[0].canToggle = false;
    }

    this._internalNodes = nodes;
  }

  _prepareDataForVisibleNodes(): void {
    const blacklist: { [key: string]: boolean } = {};
    this._internalNodes.map((node, index) => {
      if (!node.expanded) {
        blacklist[index] = true;
      }
    });

    this.data.nodes = this._internalNodes.filter(node => {
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
          source: this._internalNodes[n.parents[0]],
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
      .attr('transform', this._getChevronTransform)
      .style('fill', this._getChevronColor)
      .attr('class', this._getChevronClass);

    nodes.select('.toggle').attr('visibility', this._getToggleVisibility);

    if (this.settings.showIcons) {
      nodes.select('use.node-icon').attr('xlink:href', this._getIconId);
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
      .on('contextmenu', (_, node) => {
        this.dispatch.call('nodeRightClick', node, this);
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
      this.settings.nodeOver.node = node;

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
      this.settings.nodeOver.node = false;

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
        return node.hasChildren ? node.expanded : null;
      })
      .attr('transform', this._getNodeTransform)
      .attr('data-state-id', this._getNodeStateIdentifier)
      .attr('title', this._getNodeTitle)
      .on('mouseover', (_, node: Typo3Node) => {
        this._nodeBgEvents().mouseOver(node, this);
      })
      .on('mouseout', (_, node: Typo3Node) => {
        this._nodeBgEvents().mouseOut(node, this);
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
    return node.expanded ? 'translate(16,0) rotate(90)' : ' rotate(0)';
  }

  /**
   * Returns chevron class
   */
  _getChevronColor(node: Typo3Node): string {
    return node.expanded ? '#000' : '#8e8e8e';
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
    return 'chevron ' + (node.expanded ? 'expanded' : 'collapsed');
  }

  /**
   * Returns icon's href attribute value
   */
  _getIconId(node: Typo3Node): string {
    return '#icon-' + node.icon;
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
      new CustomEvent('typo3-node-selected', {
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
        this._internalNodes.forEach(node => {
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

  /**
   * Returns an array of selected nodes
   */
  _getSelectedNodes(): Typo3Node[] {
    return this._internalNodes.filter(node => {
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
    if (node.expanded) {
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
    node.expanded = false;
    this._setExpandedState(node);
  }

  /**
   * Updates node's data to show/expand children
   */
  _showChildren(node: Typo3Node): void {
    node.expanded = true;
    this._setExpandedState(node);
  }

  /**
   * Updates the expanded state of the DOM element that belongs to the node.
   * This is required because the node is not recreated on update and thus the change in the expanded state
   * of the node data is not represented in DOM on hideChildren and showChildren.
   */
  _setExpandedState(node: Typo3Node): void {
    const nodeElement = document.getElementById(
      'identifier-' + this._getNodeStateIdentifier(node)
    );
    if (nodeElement) {
      nodeElement.toggleAttribute(
        'aria-expanded',
        node.hasChildren ? node.expanded : false
      );
    }
  }

  /**
   * Expand all nodes and refresh view
   */
  expandAll(): void {
    this._internalNodes.forEach(this._showChildren.bind(this));
    this._prepareDataForVisibleNodes();
    this._update();
  }

  /**
   * Collapse all nodes recursively and refresh view
   */
  collapseAll(): void {
    this._internalNodes.forEach(this._hideChildren.bind(this));
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
}
