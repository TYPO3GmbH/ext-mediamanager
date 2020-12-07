import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';

export interface MoveTreeNodeEvent extends CustomEvent {
  detail: {
    event: DragEvent;
    node: Typo3Node;
    target: Typo3Node;
  };
}
