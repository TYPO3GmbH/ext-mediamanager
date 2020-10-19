import { customElement } from 'lit-element';

import { Typo3SvgTree } from './typo3-svg-tree';

@customElement('typo3-filetree')
export class Typo3Filetree extends Typo3SvgTree {
  constructor() {
    super();
    this.settings.defaultProperties = {
      hasChildren: false,
      nameSourceField: 'title',
      prefix: '',
      suffix: '',
      locked: false,
      loaded: false,
      overlayIcon: '',
      selectable: true,
      expanded: false,
      checked: false,
      backgroundColor: '',
      stopPageTree: false,
      class: '',
      readableRootline: '',
      isMountPoint: false,
    };
  }
}
