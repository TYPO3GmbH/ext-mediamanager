import { customElement } from 'lit-element';

import { Typo3SvgTree } from './typo3-svg-tree';
import { Typo3Node } from './lib/typo3-node';

@customElement('typo3-filetree')
export class Typo3Filetree extends Typo3SvgTree {
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

  _selectNode(node: Typo3Node) {
    this._getSelectedNodes()
      .filter(node => node.checked)
      .forEach(node => (node.checked = false));

    super._selectNode(node);
  }
}
