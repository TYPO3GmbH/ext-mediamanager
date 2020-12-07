import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';

export interface ContextMenuEvent extends CustomEvent {
  detail: {
    event: MouseEvent;
    node: Typo3Node | ListItem;
  };
}
