import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';
import { ContextMenuItemOption } from '../context-menu-item-option';

export interface ContextMenuItemClickEvent extends CustomEvent {
  detail: {
    contextItem: ListItem | Typo3Node;
    option: ContextMenuItemOption;
  };
}
