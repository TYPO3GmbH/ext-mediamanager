import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getUrl } from './backend-url.service';

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

        window.dispatchEvent(
          new CustomEvent('typo3-add-snackbar', {
            detail: {
              message: relevantMessages
                .map(errorMessage => errorMessage.message)
                .join('<br />'),
              title: relevantMessages[0].title,
              variant:
                relevantMessages[0].severity === 0 ? 'success' : 'danger',
            },
          })
        );
      })
    );
  }
}
