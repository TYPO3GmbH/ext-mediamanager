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

export interface Typo3Node {
  allowDelete: boolean;
  allowEdit: boolean;
  depth: number;
  hasChildren: boolean;
  icon: string;
  identifier: string;
  parentIdentifier: string | null;
  folderUrl: string;
  loaded: boolean;
  mountPoint: number;
  name: string;
  sysType: '_FILE' | '_FOLDER';
  nameSourceField: string;
  siblingsCount: number;
  siblingsPosition: number;
  stateIdentifier: string;
  tip: string;
  workspaceId: number;
  command: undefined | string;
  parents: number[];
  parentsStateIdentifier: string[];
  _isDragged: boolean;
  canToggle: boolean;
  selectable: boolean;
  overlayIcon: string;
  locked: boolean;
  hidden: boolean;
  x: number;
  y: number;
  readableRootline: boolean;
  isOver: boolean;
  owns?: string[];
  prefix?: string;
  suffix?: string;
  firstChild?: boolean;
  lastChild?: boolean;
  class?: string;
  contextMenuUrl: string;
  clipboardIdentifier: string;
}
