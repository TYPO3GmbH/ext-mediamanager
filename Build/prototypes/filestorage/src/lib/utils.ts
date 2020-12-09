import { Typo3Node } from '../../../../packages/filetree/src/lib/typo3-node';

export function addSlotToRawHtml(html: string, slotName: string): string {
  return html.replace(/(<\w*)(.*)/, '$1 slot="' + slotName + '"$2');
}

export function resolveNodePath(
  nodes: Typo3Node[],
  selectedNode: Typo3Node | null
): Typo3Node[] {
  if (0 === nodes.length) {
    return [];
  }
  if (null === selectedNode) {
    return [];
  }

  const path = [];

  let currentNode: null | Typo3Node = selectedNode;
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
