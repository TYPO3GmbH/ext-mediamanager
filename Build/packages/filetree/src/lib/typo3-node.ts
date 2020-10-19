export interface Typo3Node {
  allowDelete: boolean;
  allowEdit: boolean;
  depth: number;
  hasChildren: boolean;
  icon: string;
  identifier: number | string;
  loaded: boolean;
  mountPoint: number;
  name: string;
  nameSourceField: string;
  siblingsCount: number;
  siblingsPosition: number;
  stateIdentifier: string;
  tip: string;
  workspaceId: number;
  command: undefined | string;
  expanded: boolean;
  parents: number[];
  parentsStateIdentifier: string[];
  _isDragged: boolean;
  canToggle: boolean;
  checked: boolean;
  selectable: boolean;
  overlayIcon: string;
  locked: boolean;
  hidden: boolean;
  x: number;
  y: number;
  readableRootline: boolean;
  isOver: boolean;
  owns: any;
  prefix?: string;
  suffix?: string;
  firstChild?: boolean;
  lastChild?: boolean;
  class: any;
}
