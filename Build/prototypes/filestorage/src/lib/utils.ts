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

import { Node } from '../../../../types/node';

export function addSlotToRawHtml(html: string, slotName: string): string {
  return html.replace(/(<\w*)(.*)/, '$1 slot="' + slotName + '"$2');
}

export function resolveNodePath(
  nodes: Node[],
  selectedNode: Node | null
): Node[] {
  if (0 === nodes.length) {
    return [];
  }
  if (null === selectedNode) {
    return [];
  }

  const path = [];

  let currentNode: null | Node = selectedNode;
  while (null !== currentNode) {
    path.unshift(currentNode);
    currentNode =
      nodes.find(node => node.identifier === currentNode?.parentIdentifier) ??
      null;
  }
  return path;
}

export function extractStorageFromIdentifier(identifier: string): string {
  const matches = /(\d:).*/gm.exec(identifier);

  return matches ? matches[1] : '';
}

export function openAsLink(
  url: string,
  attributes: { [key: string]: string } = {}
): void {
  Object.assign(document.createElement('a'), {
    href: url,
    target: '_blank',
    ...attributes,
  }).click();
}
