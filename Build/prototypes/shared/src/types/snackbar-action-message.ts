import { Message } from './message';
import { SnackbarButton } from './snackbar-data';

export const SNACKBAR_ACTION_MESSAGE_TYPE = 'typo3-snackbar-action';

export class SnackbarActionMessage implements Message {
  readonly type = SNACKBAR_ACTION_MESSAGE_TYPE;
  constructor(public actionName: string, public actionData: SnackbarButton) {}
}
