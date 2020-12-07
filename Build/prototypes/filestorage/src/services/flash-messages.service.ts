import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getUrl } from './backend-url.service';
import { SnackbarValues } from '../../../../packages/snackbar/src/lib/snackbar-values';
import { SnackbarVariants } from '../../../../packages/snackbar/src/lib/snackbar-variants';

interface Message {
  message: string;
  title: string;
  severity: number;
}

export class FlashMessagesService {
  constructor(private ignoreSuccessMessages = true) {}

  fetchFlashMessages(): Observable<Message[]> {
    // @ts-ignore
    const flashMessagesUrl: string = getUrl('flashMessagesUrl');

    return ajax.getJSON<Message[]>(flashMessagesUrl).pipe(
      tap(messages => {
        const relevantMessages = this.ignoreSuccessMessages
          ? messages.filter(messageData => messageData.severity != 0)
          : messages;

        if (0 === relevantMessages.length) {
          return;
        }

        const flashMessage = {
          message: relevantMessages
            .map(errorMessage => errorMessage.message)
            .join('<br />'),
          title: relevantMessages[0].title,
          variant:
            relevantMessages[0].severity === 0
              ? SnackbarVariants.success
              : SnackbarVariants.danger,
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
