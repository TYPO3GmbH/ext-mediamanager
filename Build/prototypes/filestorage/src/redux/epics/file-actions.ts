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

import { ActionsObservable, StateObservable } from 'redux-observable';

import * as fromActions from '../ducks/file-actions';
import {
  DownloadFilesFailure,
  DownloadFilesSuccess,
} from '../ducks/file-actions';
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import * as fromGlobal from '../ducks/global-actions';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { Action } from 'redux';
import { getUrl } from '../../services/backend-url.service';
import { translate } from '../../services/translation.service';
import { RootState } from '../ducks';
import { UndoActionResolverService } from '../../services/undo-action-resolver.service';
import { ModalData, ModalType } from '../../../../shared/src/types/modal-data';
import { ModalService } from '../../services/modal.service';
import { openAsLink } from '../../lib/utils';
import { ApiService } from '../../services/api.service';
import { SeverityEnum } from '../../../../shared/src/types/Severity';
import * as _ from 'lodash-es';
import { ModalVariant } from '../../../../../packages/modal/src/lib/modal-variant';

export const renameFile = (
  action$: ActionsObservable<fromActions.RenameFile>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(fromActions.RENAME_FILE).pipe(
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const formData = new FormData();
      formData.append('data[rename][0][data]', action.identifier);
      formData.append('data[rename][0][target]', action.name);
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(response =>
            dependencies.undoActionResolverService.getUndoAction(
              action,
              response,
              state
            )
          ),
          map(
            undoAction =>
              new fromActions.RenameFileSuccess(
                translate('message.header.fileRenamed'),
                undoAction
              )
          ),
          catchError(() => of(new fromActions.RenameFileFailure()))
        );
    })
  );
};

export const confirmDeleteFiles = (
  action$: ActionsObservable<fromActions.DeleteFilesConfirm>,
  state$: StateObservable<RootState>,
  dependencies: { modalService: ModalService }
): Observable<Action> => {
  return action$.ofType(fromActions.DELETE_FILES_CONFIRM).pipe(
    switchMap(action => {
      const modalData = {
        ...action.modalData,
        type: ModalType.CONFIRM,
        variant: ModalVariant.warning,
        dismissible: true,
        modalButtons: [
          {
            label: translate('button.cancel'),
            color: 'default',
            action: 'typo3-delete-cancel',
          },
          {
            label: translate('button.delete'),
            color: 'warning',
            action: 'typo3-confirm-delete',
          },
        ],
      } as ModalData;
      return dependencies.modalService.openModal(modalData).pipe(
        filter(data => 'typo3-confirm-delete' === data.actionName),
        map(() => new fromActions.DeleteFiles(action.identifiers))
      );
    })
  );
};

export const deleteFiles = (
  action$: ActionsObservable<fromActions.DeleteFiles>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(fromActions.DELETE_FILES).pipe(
    switchMap(action => {
      const formData = new FormData();
      action.identifiers.forEach((identifier, index) => {
        formData.append('data[delete][' + index + '][data]', identifier);
      });
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(
            () =>
              new fromActions.DeleteFilesSuccess(
                translate('message.header.fileDeleted')
              )
          ),
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
      window.top.TYPO3.InfoWindow.showItem(action.sysType, action.identifier);
    }),
    ignoreElements()
  );
};

export const showFile = (
  action$: ActionsObservable<fromActions.ShowFile>
): Observable<Action> => {
  return action$.ofType(fromActions.SHOW_FILE).pipe(
    tap(action => openAsLink(action.fileUrl)),
    ignoreElements()
  );
};

export const addFolder = (
  action$: ActionsObservable<fromActions.AddFolder>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(fromActions.ADD_FOLDER).pipe(
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const formData = new FormData();
      formData.append('data[newfolder][0][data]', action.node.name);
      formData.append(
        'data[newfolder][0][target]',
        action.parentNode.identifier
      );
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(response =>
            dependencies.undoActionResolverService.getUndoAction(
              action,
              response,
              state
            )
          ),
          map(
            undoAction =>
              new fromActions.AddFolderSuccess(
                translate('message.header.folderCreated'),
                undoAction
              )
          ),
          catchError(() => of(new fromActions.AddFolderFailure()))
        );
    })
  );
};

export const uploadFiles = (
  action$: ActionsObservable<fromActions.UploadFiles>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(fromActions.UPLOAD_FILES).pipe(
    switchMap(action => {
      const files: File[] = [];
      const targetIdentifier = action.node.identifier;

      for (let i = 0; i < action.dataTransfer.files.length; i++) {
        files.push(action.dataTransfer.files.item(i) as File);
      }

      const fileExistsChecks = files.map(file => {
        const url = getUrl('fileExistsUrl', {
          fileName: file.name,
          fileTarget: targetIdentifier,
        });

        return dependencies.apiService.getJSON<{ name?: string }[]>(url);
      });

      return forkJoin(fileExistsChecks).pipe(
        map(results => {
          const uploadableFiles: File[] = [];
          const conflictFiles: File[] = [];

          files.forEach(file => {
            const fileExists = _.some(results, { name: file.name });
            if (fileExists) {
              conflictFiles.push(file);
            } else {
              uploadableFiles.push(file);
            }
          });

          return {
            uploadableFiles: uploadableFiles,
            conflictFiles: conflictFiles,
            targetIdentifier: targetIdentifier,
          };
        })
      );
    }),
    switchMap(data => {
      const formData = new FormData();
      data.uploadableFiles.forEach((file, i) => {
        formData.append(
          'data[upload][' + i + '][target]',
          data.targetIdentifier
        );
        formData.append('data[upload][' + i + '][data]', i.toString());
        formData.append('upload_' + i, file);
      });

      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          mergeMap(() => {
            const actions: Action[] = [
              new fromActions.UploadFilesSuccess(
                translate('message.header.filesUploaded')
              ),
            ];

            if (data.conflictFiles.length > 0) {
              actions.push(
                new fromActions.UploadFilesConflicts(
                  data.conflictFiles,
                  data.targetIdentifier
                )
              );
            }

            return actions;
          }),
          catchError(() => of(new fromActions.UploadFilesFailure()))
        );
    })
  );
};

export const uploadFilesConflict = (
  action$: ActionsObservable<fromActions.UploadFilesConflicts>
): Observable<Action> => {
  return action$.ofType(fromActions.UPLOAD_FILES_CONFLICTS).pipe(
    switchMap(action => {
      const files: File[] = [];
    })
  );
};

export const moveFiles = (
  action$: ActionsObservable<fromActions.MoveFiles>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(fromActions.MOVE_FILES).pipe(
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const formData = new FormData();
      for (let i = 0; i < action.identifiers.length; i++) {
        formData.append(
          'data[move][' + i + '][target]',
          action.target.identifier
        );
        formData.append('data[move][' + i + '][data]', action.identifiers[i]);
      }
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(response =>
            dependencies.undoActionResolverService.getUndoAction(
              action,
              response,
              state
            )
          ),
          map(
            undoAction =>
              new fromActions.MoveFilesSuccess(
                translate('message.header.filesMoved'),
                undoAction
              )
          ),
          catchError(() => of(new fromActions.MoveFilesFailure()))
        );
    })
  );
};

export const copyFiles = (
  action$: ActionsObservable<fromActions.CopyFiles>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(fromActions.COPY_FILES).pipe(
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const formData = new FormData();
      for (let i = 0; i < action.identifiers.length; i++) {
        formData.append(
          'data[copy][' + i + '][target]',
          action.target.identifier
        );
        formData.append('data[copy][' + i + '][data]', action.identifiers[i]);
      }
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(response =>
            dependencies.undoActionResolverService.getUndoAction(
              action,
              response,
              state
            )
          ),
          map(
            undoAction =>
              new fromActions.CopyFilesSuccess(
                translate('message.header.filesCopied'),
                undoAction
              )
          ),
          catchError(() => of(new fromActions.CopyFilesFailure()))
        );
    })
  );
};

export const clipboardSelectionAction = (
  action$: ActionsObservable<fromActions.ClipboardSelectionActions>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
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
        const params: Record<string, string> = {};
        params[`CB[el][_FILE|${action.clipboardIdentifier}]`] =
          action.identifier;
        if (
          -1 !==
          [
            fromActions.CLIPBOARD_COPY_FILE,
            fromActions.CLIPBOARD_COPY_RELEASE_FILE,
          ].indexOf(action.type)
        ) {
          params['CB[setCopyMode]'] = '1';
        }

        return dependencies.apiService
          .postFormData(getUrl('clipboardUrl', params))
          .pipe(
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
  action$: ActionsObservable<fromActions.ClipboardPaste>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(fromActions.CLIPBOARD_PASTE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('CB[paste]', 'FILE|' + action.targetIdentifier);
      formData.append('CB[pad]', 'normal');
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(
            () =>
              new fromActions.ClipboardPasteSuccess(
                translate('message.header.filesMoved')
              )
          ),
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
      const url: string = getUrl('downloadFilesUrl');
      return ajax({
        url: url,
        method: 'POST',
        body: formData,
        responseType: 'arraybuffer',
      }).pipe(
        tap(response => {
          const file = new Blob([response.response], {
            type: response.xhr.getResponseHeader('Content-Type') ?? undefined,
          });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // IE
            window.navigator.msSaveOrOpenBlob(file);
          } else {
            const downloadUrl = URL.createObjectURL(file);
            openAsLink(downloadUrl, {
              target: '_self',
              download: '',
            });
            setTimeout(function () {
              URL.revokeObjectURL(downloadUrl);
            }, 100); // cleanup
          }
        }),
        map(() => new DownloadFilesSuccess()),
        catchError((error: AjaxError) => {
          const message = String.fromCharCode.apply(
            null,
            new Uint8Array(error.response) as never
          );
          dispatchEvent(
            new CustomEvent('typo3-add-snackbar', {
              detail: {
                message: message,
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
      const storageId = parseInt(action.identifier, 10);
      const params: Record<string, string> = {};
      params[`edit[sys_file_storage][${storageId}]`] = 'edit';
      params.returnUrl = window.document.location.href;
      window.location.href = getUrl('editFileStorageUrl', params);
    }),
    ignoreElements()
  );
};

export const replaceFileConfirm = (
  action$: ActionsObservable<fromActions.ReplaceFileConfirm>,
  state$: StateObservable<RootState>,
  dependencies: { modalService: ModalService }
): Observable<Action> => {
  return action$.ofType(fromActions.REPLACE_FILE_CONFIRM).pipe(
    switchMap(action => {
      const formContent = `
        <form enctype="multipart/form-data">
          <div>
            <typo3-formfield
              label="${translate('file_replace.keepfiletitle')}"
              label-align="right"
            >
              <input type="checkbox" value="1" name="data[replace][1][keepFilename]">
            </typo3-formfield>
          </div>
          <div>
            <typo3-formfield label="${translate('file_replace.selectfile')}">
              <input required type="file" name="replace_1">
            </typo3-formfield>
          </div>
          <input type="hidden" name="data[replace][1][data]" value="1">
          <input type="hidden" name="overwriteExistingFiles" value="replace">
          <input type="hidden" name="data[replace][1][uid]" value="${
            action.identifier
          }">
        </form>`;

      return dependencies.modalService
        .openModal({
          headline: translate('file_replace.pagetitle'),
          type: ModalType.HTML,
          isForm: true,
          dismissible: true,
          variant: ModalVariant.warning,
          content: formContent,
          modalButtons: [
            {
              label: translate('button.cancel'),
              color: 'default',
              action: 'typo3-replace-cancel',
            },
            {
              label: translate('file_replace.submit'),
              color: 'warning',
              action: 'typo3-replace-confirm',
            },
          ],
        })
        .pipe(
          filter(data => 'typo3-replace-confirm' === data.actionName),
          map(data => new fromActions.ReplaceFile(data.actionData ?? {}))
        );
    })
  );
};

export const replaceFile = (
  action$: ActionsObservable<fromActions.ReplaceFile>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(fromActions.REPLACE_FILE).pipe(
    switchMap(action => {
      const formData = new FormData();
      for (const key in action.formData) {
        formData.append(key, action.formData[key]);
      }
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(
            () =>
              new fromActions.ReplaceFileSuccess(
                translate('file_replace.pagetitle')
              )
          ),
          catchError(() => of(new fromActions.ReplaceFileFailure()))
        );
    })
  );
};

export const undoFileAction = (
  action$: ActionsObservable<fromActions.UndoFilesAction>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(fromActions.UNDO_FILES_ACTION).pipe(
    switchMap(action => {
      const formData = new FormData();
      for (const key in action.formData) {
        formData.append(key, action.formData[key]);
      }

      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(
            () =>
              new fromActions.UndoFilesActionSuccess(
                translate('message.header.undo')
              )
          ),
          catchError(() => of(new fromActions.UndoFilesActionFailure()))
        );
    })
  );
};

export const fileActionSuccess = (
  action$: ActionsObservable<fromActions.SuccessAction>
): Observable<Action> => {
  return action$
    .ofType(
      fromActions.ADD_FOLDER_SUCCESS,
      fromActions.DELETE_FILES_SUCCESS,
      fromActions.RENAME_FILE_SUCCESS,
      fromActions.UPLOAD_FILES_SUCCESS,
      fromActions.MOVE_FILES_SUCCESS,
      fromActions.COPY_FILES_SUCCESS,
      fromActions.CLIPBOARD_PASTE_SUCCESS,
      fromActions.REPLACE_FILE_SUCCESS,
      fromActions.UNDO_FILES_ACTION_SUCCESS
    )
    .pipe(
      mergeMap(action => [
        new fromGlobal.Reload(),
        new fromGlobal.LoadFlashMessages(
          SeverityEnum.ok,
          action.message,
          action.undoAction
        ),
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
      fromActions.CLIPBOARD_PASTE_FAILURE,
      fromActions.REPLACE_FILE_FAILURE,
      fromActions.UNDO_FILES_ACTION_FAILURE
    )
    .pipe(
      mergeMap(action => {
        const actions: Action[] = [
          new fromGlobal.LoadFlashMessages(
            SeverityEnum.error,
            translate('message.header.genericError')
          ),
        ];
        if (
          [
            fromActions.RENAME_FILE_FAILURE,
            fromActions.ADD_FOLDER_FAILURE,
            fromActions.MOVE_FILES_FAILURE,
            fromActions.COPY_FILES_FAILURE,
            fromActions.UPLOAD_FILES_FAILURE,
          ].indexOf(action.type) != -1
        ) {
          actions.push(new fromGlobal.Reload());
        }
        return actions;
      })
    );
};

interface Typo3Modal {
  types: { [propName: string]: string };
  sizes: { [propName: string]: string };

  advanced(data: { type: string; size: string; content: string }): void;
}

export const editFileMetadata = (
  action$: ActionsObservable<fromActions.EditFileMetadata>
): Observable<Action> => {
  return action$.ofType(fromActions.EDIT_FILE_METADATA).pipe(
    tap(action => {
      // @ts-ignore
      const topModal: Typo3Modal = window.top.TYPO3.Modal;
      topModal.advanced({
        type: topModal.types.iframe,
        size: topModal.sizes.large,
        content: action.metaDataUrl,
      });
    }),
    ignoreElements()
  );
};

export const fileActions = [
  addFolder,
  clipboardPaste,
  clipboardSelectionAction,
  copyFiles,
  confirmDeleteFiles,
  deleteFiles,
  downloadFiles,
  editFileMetadata,
  editFileStorage,
  fileActionFailure,
  fileActionSuccess,
  moveFiles,
  renameFile,
  replaceFile,
  replaceFileConfirm,
  showFileInfo,
  undoFileAction,
  uploadFiles,
  uploadFilesConflict,
  showFile,
];
