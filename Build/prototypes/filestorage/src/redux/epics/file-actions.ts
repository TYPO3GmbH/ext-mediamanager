import { ActionsObservable } from 'redux-observable';

import * as fromActions from '../ducks/file-actions';
import {
  catchError,
  ignoreElements,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import * as fromGlobal from '../ducks/global-actions';
import { Observable, of } from 'rxjs';
import { Action } from 'redux';

export const renameFile = (
  action$: ActionsObservable<fromActions.RenameFile>
): Observable<Action> => {
  return action$.ofType(fromActions.RENAME_FILE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('data[rename][0][data]', action.identifier);
      formData.append('data[rename][0][target]', action.name);
      return ajax
        .post(action.fileActionUrl, formData)
        .pipe(catchError(error => of(error)));
    }),
    mergeMap(() => [
      new fromGlobal.Reload(),
      new fromGlobal.LoadFlashMessages(),
    ])
  );
};

export const deleteFiles = (
  action$: ActionsObservable<fromActions.DeleteFiles>
): Observable<Action> => {
  return action$.ofType(fromActions.DELETE_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      action.uids.forEach((uid, index) => {
        formData.append('data[delete][' + index + '][data]', uid);
      });
      return ajax.post(action.fileActionUrl, formData).pipe(
        mergeMap(() => [
          new fromGlobal.Reload(),
          new fromGlobal.LoadFlashMessages(),
        ]),
        catchError(() => of(new fromGlobal.LoadFlashMessages()))
      );
    })
  );
};

export const showFileInfo = (
  action$: ActionsObservable<fromActions.ShowFileInfo>
): Observable<Action> => {
  return action$.ofType(fromActions.SHOW_FILE_INFO).pipe(
    tap(action => {
      // @ts-ignore
      window.top.TYPO3.InfoWindow.showItem(action.sys_type, action.uid);
    }),
    ignoreElements()
  );
};

export const addFolder = (
  action$: ActionsObservable<fromActions.AddFolder>
): Observable<Action> => {
  return action$.ofType(fromActions.ADD_FOLDER).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('data[newfolder][0][data]', action.node.name);
      formData.append(
        'data[newfolder][0][target]',
        action.parentNode.identifier
      );
      return ajax
        .post(action.fileActionUrl, formData)
        .pipe(catchError(error => of(error)));
    }),
    mergeMap(() => [
      new fromGlobal.Reload(),
      new fromGlobal.LoadFlashMessages(),
    ])
  );
};

export const uploadFiles = (
  action$: ActionsObservable<fromActions.UploadFiles>
): Observable<Action> => {
  return action$.ofType(fromActions.UPLOAD_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      for (let i = 0; i < action.dataTransfer.files.length; i++) {
        formData.append(
          'data[upload][' + i + '][target]',
          action.node.identifier
        );
        formData.append('data[upload][' + i + '][data]', i.toString());
        formData.append(
          'upload_' + i,
          action.dataTransfer.files.item(i) as File
        );
      }
      return ajax.post(action.fileActionUrl, formData).pipe(
        mergeMap(() => [
          new fromGlobal.Reload(),
          new fromGlobal.LoadFlashMessages(),
        ]),
        catchError(() => of(new fromGlobal.LoadFlashMessages()))
      );
    })
  );
};
