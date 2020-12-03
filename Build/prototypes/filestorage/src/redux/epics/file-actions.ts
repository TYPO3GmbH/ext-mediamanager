import { ActionsObservable } from 'redux-observable';

import * as fromActions from '../ducks/file-actions';
import {
  DownloadFilesFailure,
  DownloadFilesSuccess,
} from '../ducks/file-actions';
import {
  catchError,
  ignoreElements,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import * as fromGlobal from '../ducks/global-actions';
import { EMPTY, Observable, of } from 'rxjs';
import { Action } from 'redux';

export const renameFile = (
  action$: ActionsObservable<fromActions.RenameFile>
): Observable<Action> => {
  return action$.ofType(fromActions.RENAME_FILE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('data[rename][0][data]', action.identifier);
      formData.append('data[rename][0][target]', action.name);
      return ajax.post(action.fileActionUrl, formData).pipe(
        map(() => new fromActions.RenameFileSuccess()),
        catchError(() => of(new fromActions.RenameFileFailure()))
      );
    })
  );
};

export const deleteFiles = (
  action$: ActionsObservable<fromActions.DeleteFiles>
): Observable<Action> => {
  return action$.ofType(fromActions.DELETE_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      action.identifiers.forEach((identifier, index) => {
        formData.append('data[delete][' + index + '][data]', identifier);
      });
      return ajax.post(action.fileActionUrl, formData).pipe(
        map(() => new fromActions.DeleteFilesSuccess()),
        catchError(() => of(new fromActions.DeleteFilesFailure()))
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
      window.top.TYPO3.InfoWindow.showItem(action.sys_type, action.identifier);
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
      return ajax.post(action.fileActionUrl, formData).pipe(
        map(() => new fromActions.AddFolderSuccess()),
        catchError(() => of(new fromActions.AddFolderFailure()))
      );
    })
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
        map(() => new fromActions.UploadFilesSuccess()),
        catchError(() => of(new fromActions.UploadFilesFailure()))
      );
    })
  );
};

export const moveFiles = (
  action$: ActionsObservable<fromActions.MoveFiles>
): Observable<Action> => {
  return action$.ofType(fromActions.MOVE_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      for (let i = 0; i < action.identifiers.length; i++) {
        formData.append(
          'data[move][' + i + '][target]',
          action.target.identifier
        );
        formData.append('data[move][' + i + '][data]', action.identifiers[i]);
      }
      return ajax.post(action.fileActionUrl, formData).pipe(
        map(() => new fromActions.MoveFilesSuccess()),
        catchError(() => of(new fromActions.MoveFilesFailure()))
      );
    })
  );
};

export const copyFiles = (
  action$: ActionsObservable<fromActions.CopyFiles>
): Observable<Action> => {
  return action$.ofType(fromActions.COPY_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      for (let i = 0; i < action.identifiers.length; i++) {
        formData.append(
          'data[copy][' + i + '][target]',
          action.target.identifier
        );
        formData.append('data[copy][' + i + '][data]', action.identifiers[i]);
      }
      return ajax.post(action.fileActionUrl, formData).pipe(
        map(() => new fromActions.CopyFilesSuccess()),
        catchError(() => of(new fromActions.CopyFilesFailure()))
      );
    })
  );
};

export const clipboardSelectionAction = (
  action$: ActionsObservable<fromActions.ClipboardSelectionActions>
): Observable<void> => {
  return action$
    .ofType(
      fromActions.CLIPBOARD_COPY_FILE,
      fromActions.CLIPBOARD_CUT_FILE,
      fromActions.CLIPBOARD_COPY_RELEASE_FILE,
      fromActions.CLIPBOARD_CUT_RELEASE_FILE
    )
    .pipe(
      switchMap(action => {
        // @ts-ignore
        const url: string = window.clipboardUrl;
        const params = new URLSearchParams();
        params.append(
          'CB[el][_FILE|' + action.clipboardIdentifier + ']',
          action.identifier
        );
        if (
          -1 !==
          [
            fromActions.CLIPBOARD_COPY_FILE,
            fromActions.CLIPBOARD_COPY_RELEASE_FILE,
          ].indexOf(action.type)
        ) {
          params.append('CB[setCopyMode]', '1');
        }

        return ajax.post(url + '&' + params.toString()).pipe(
          catchError(() => {
            console.warn('error during clipboard action');
            return EMPTY;
          })
        );
      }),
      ignoreElements()
    );
};

export const clipboardPaste = (
  action$: ActionsObservable<fromActions.ClipboardPaste>
): Observable<Action> => {
  return action$.ofType(fromActions.CLIPBOARD_PASTE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('CB[paste]', 'FILE|' + action.targetIdentifier);
      formData.append('CB[pad]', 'normal');
      return ajax.post(action.fileActionUrl, formData).pipe(
        map(() => new fromActions.ClipboardPasteSuccess()),
        catchError(() => of(new fromActions.ClipboardPasteFailure()))
      );
    })
  );
};

export const downloadFiles = (
  action$: ActionsObservable<fromActions.DownloadFiles>
): Observable<Action> => {
  return action$.ofType(fromActions.DOWNLOAD_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      action.identifiers.forEach((identifier, i) => {
        formData.append('identifiers[' + i + ']', identifier);
      });

      // @ts-ignore
      const url: string = window.downloadFilesUrl;
      return ajax({
        url: url,
        method: 'POST',
        body: formData,
        responseType: 'arraybuffer',
      }).pipe(
        tap(response => {
          console.log('create file');
          const file = new Blob([response.response], {
            type: response.xhr.getResponseHeader('Content-Type') ?? undefined,
          });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // IE
            window.navigator.msSaveOrOpenBlob(file);
          } else {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          }
        }),
        map(() => new DownloadFilesSuccess()),
        catchError((error: AjaxError) => {
          window.dispatchEvent(
            new CustomEvent('typo3-add-snackbar', {
              detail: {
                message: error.message,
                variant: 'danger',
              },
            })
          );
          return of(new DownloadFilesFailure());
        })
      );
    })
  );
};

export const editFileStorage = (
  action$: ActionsObservable<fromActions.EditFileStorage>
): Observable<Action> => {
  return action$.ofType(fromActions.EDIT_FILE_STORAGE).pipe(
    tap(action => {
      // @ts-ignore
      const url: string = window.editFileStorageUrl;

      const storageId = parseInt(action.identifier);
      const params = new URLSearchParams();
      params.append('edit[sys_file_storage][' + storageId + ']', 'edit');
      params.append('returnUrl', window.document.location.href);

      // @ts-ignore
      window.location.href = url + '&' + params.toString();
    }),
    ignoreElements()
  );
};

export const fileActionSuccess = (
  action$: ActionsObservable<fromActions.Actions>
): Observable<Action> => {
  return action$
    .ofType(
      fromActions.ADD_FOLDER_SUCCESS,
      fromActions.DELETE_FILES_SUCCESS,
      fromActions.RENAME_FILE_SUCCESS,
      fromActions.UPLOAD_FILES_SUCCESS,
      fromActions.MOVE_FILES_SUCCESS,
      fromActions.COPY_FILES_SUCCESS,
      fromActions.CLIPBOARD_PASTE_SUCCESS
    )
    .pipe(
      mergeMap(() => [
        new fromGlobal.Reload(),
        new fromGlobal.LoadFlashMessages(),
      ])
    );
};

export const fileActionFailure = (
  action$: ActionsObservable<fromActions.Actions>
): Observable<Action> => {
  return action$
    .ofType(
      fromActions.DELETE_FILES_FAILURE,
      fromActions.RENAME_FILE_FAILURE,
      fromActions.UPLOAD_FILES_FAILURE,
      fromActions.MOVE_FILES_FAILURE,
      fromActions.COPY_FILES_FAILURE,
      fromActions.CLIPBOARD_PASTE_FAILURE
    )
    .pipe(
      mergeMap(action => {
        const actions: Action[] = [new fromGlobal.LoadFlashMessages()];
        if (
          [
            fromActions.RENAME_FILE_FAILURE,
            fromActions.ADD_FOLDER_FAILURE,
            fromActions.MOVE_FILES_FAILURE,
            fromActions.COPY_FILES_FAILURE,
          ].indexOf(action.type) != -1
        ) {
          actions.push(new fromGlobal.Reload());
        }
        return actions;
      })
    );
};

export const fileActions = [
  fileActionFailure,
  fileActionSuccess,
  clipboardSelectionAction,
  clipboardPaste,
  addFolder,
  deleteFiles,
  editFileStorage,
  renameFile,
  showFileInfo,
  uploadFiles,
  moveFiles,
  copyFiles,
  downloadFiles,
];
