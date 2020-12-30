import { Observable, throwError } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, tap } from 'rxjs/operators';

export class ApiService {
  getJSON<T>(url: string): Observable<T> {
    return ajax.get(url).pipe(
      tap(ApiService.detectSessionTimeout),
      map(response => response.response),
      // rethrow error
      catchError(e => throwError(e))
    );
  }

  private static detectSessionTimeout(response: AjaxResponse): void {
    if (response.xhr.responseURL.match(/login/)) {
      top.location.href = response.xhr.responseURL;
      throw Error('Login required');
    }
  }
}
