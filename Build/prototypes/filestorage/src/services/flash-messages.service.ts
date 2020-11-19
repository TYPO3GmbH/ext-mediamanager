import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Message {
  message: string;
  title: string;
  severity: number;
}

export class FlashMessagesService {
  fetchFlashMessages(): Observable<Message[]> {
    // @ts-ignore
    const flashMessagesUrl: string = window.flashMessagesUrl;

    return ajax.getJSON<Message[]>(flashMessagesUrl).pipe(
      tap(messages => {
        messages.forEach(messageData => {
          window.dispatchEvent(
            new CustomEvent('typo3-add-snackbar', {
              detail: {
                message: messageData.message,
                title: messageData.title,
                variant: messageData.severity === 0 ? 'success' : 'danger',
              },
            })
          );
        });
      })
    );
  }
}
