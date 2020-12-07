import { Typo3Node } from '../../../../../packages/filetree/src/lib/typo3-node';

export interface MoveFilesModalEvent extends CustomEvent {
  detail: {
    mode: 'copy' | 'move';
    files: ListItem[];
    target: Typo3Node;
  };
}
