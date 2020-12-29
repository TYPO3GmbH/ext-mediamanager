import { Message } from './message';
import { SnackbarData } from './snackbar-data';

export const SHOW_SNACKBAR_MESSAGE_TYPE = 'typo3-show-snackbar';

export class ShowSnackbarMessage implements Message {
  readonly type = SHOW_SNACKBAR_MESSAGE_TYPE;
  constructor(public data: SnackbarData) {}
}
