/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import { Observable, throwError } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, tap } from 'rxjs/operators';

export class ApiService {
  private static detectSessionTimeout(response: AjaxResponse): void {
    if (response.xhr.responseURL.match(/login/)) {
      top.location.href = response.xhr.responseURL;
      throw Error('Login required');
    }
  }

  getJSON<T>(url: string): Observable<T> {
    return ajax.get(url).pipe(
      tap(ApiService.detectSessionTimeout),
      map(response => response.response),
      // rethrow error
      catchError(e => throwError(e))
    );
  }

  postFormData(url: string, formData?: FormData): Observable<AjaxResponse> {
    return ajax.post(url, formData).pipe(
      tap(ApiService.detectSessionTimeout),
      // rethrow error
      catchError(e => throwError(e))
    );
  }
}
