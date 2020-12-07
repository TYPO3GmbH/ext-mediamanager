import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';

export interface TreeNodeDropEvent extends CustomEvent {
  detail: {
    event: DragEvent;
    node: Typo3Node;
  };
}
