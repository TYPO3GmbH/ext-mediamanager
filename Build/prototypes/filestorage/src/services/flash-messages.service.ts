import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getUrl } from './backend-url.service';
import { SnackbarValues } from '../../../../packages/snackbar/src/lib/snackbar-values';
import * as fromGlobalActions from '../redux/ducks/global-actions';

interface Message {
  message: string;
  title: string;
  severity: number;
}

export class FlashMessagesService {
  fetchFlashMessages(
    action: fromGlobalActions.LoadFlashMessages
  ): Observable<Message[]> {
    const flashMessagesUrl: string = getUrl('flashMessagesUrl');

    return ajax.getJSON<Message[]>(flashMessagesUrl).pipe(
      tap(messages => {
        let undoButton = '';
        if (action.undoAction) {
          undoButton =
            "<typo3-file-action-undo-button undoAction='" +
            JSON.stringify(action.undoAction) +
            "'></typo3-file-action-undo-button>";
        }
        const flashMessage = {
          message:
            messages.map(errorMessage => errorMessage.message).join('<br />') +
            undoButton,

          title: action.message,
          variant: action.variant,
          duration: 5000,
        };
        this.displayFlashMessage(flashMessage as SnackbarValues);
      })
    );
  }

  displayFlashMessage(data: SnackbarValues): void {
    window.dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: data,
      })
    );
  }
}
