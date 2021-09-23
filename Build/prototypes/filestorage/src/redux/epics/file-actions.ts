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
import { EMPTY, Observable, of } from 'rxjs';
import { Action } from 'redux';
import { getUrl } from '../../services/backend-url.service';
import { translate } from '../../services/translation.service';
import { RootState } from '../ducks/reducers';
import { UndoActionResolverService } from '../../services/undo-action-resolver.service';
import { ModalData, ModalType } from '../../../../shared/src/types/modal-data';
import { ModalService } from '../../services/modal.service';
import { openAsLink } from '../../lib/utils';
import { ApiService } from '../../services/api.service';
import { SeverityEnum } from '../../../../shared/src/types/Severity';
import { ModalVariant } from '../../../../../packages/modal/src/lib/modal-variant';
import { CLIPBOARD_PAD } from '../../lib/mediamanager-clipboard-name';
import { FileActions, GlobalActions } from '../ducks/actions';
import {
  uploadFiles,
  uploadFilesConflict,
} from './file-actions/upload-file-actions';

export const renameFile = (
  action$: ActionsObservable<FileActions.RenameFile>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(FileActions.RENAME_FILE).pipe(
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
              new FileActions.RenameFileSuccess(
                translate('message.header.fileRenamed'),
                undoAction
              )
          ),
          catchError(() => of(new FileActions.RenameFileFailure()))
        );
    })
  );
};

export const confirmDeleteFiles = (
  action$: ActionsObservable<FileActions.DeleteFilesConfirm>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService; modalService: ModalService }
): Observable<Action> => {
  return action$.ofType(FileActions.DELETE_FILES_CONFIRM).pipe(
    switchMap(action => {
      const parameters: { [key: string]: string } = {};
      action.identifiers.forEach((identifier, i) => {
        parameters[`identifiers[${i}]`] = identifier;
      });

      const url = getUrl(
        'mediamanager_delete_resources_confirm_modal_data',
        parameters
      );

      return dependencies.apiService
        .getJSON<{
          closeText: string;
          deleteText: string;
          message: string;
          title: string;
        }>(url)
        .pipe(map(modalData => [action, modalData]));
    }),
    switchMap(([action, data]) => {
      const modalData = {
        title: data.title,
        content: data.message,
        type: ModalType.CONFIRM,
        variant: ModalVariant.danger,
        dismissible: true,
        modalButtons: [
          {
            label: data.closeText,
            color: 'default',
            action: 'typo3-delete-cancel',
          },
          {
            label: data.deleteText,
            color: ModalVariant.danger,
            action: 'typo3-confirm-delete',
          },
        ],
      } as ModalData;
      return dependencies.modalService.openModal(modalData).pipe(
        filter(data => 'typo3-confirm-delete' === data.actionName),
        map(() => new FileActions.DeleteFiles(action.identifiers))
      );
    })
  );
};

export const deleteFiles = (
  action$: ActionsObservable<FileActions.DeleteFiles>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(FileActions.DELETE_FILES).pipe(
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
              new FileActions.DeleteFilesSuccess(
                translate('message.header.fileDeleted')
              )
          ),
          catchError(() => of(new FileActions.DeleteFilesFailure()))
        );
    })
  );
};

export const showFileInfo = (
  action$: ActionsObservable<FileActions.ShowFileInfo>
): Observable<Action> => {
  return action$.ofType(FileActions.SHOW_FILE_INFO).pipe(
    tap(action => {
      // @ts-ignore
      window.top.TYPO3.InfoWindow.showItem(action.sysType, action.identifier);
    }),
    ignoreElements()
  );
};

export const showFile = (
  action$: ActionsObservable<FileActions.ShowFile>
): Observable<Action> => {
  return action$.ofType(FileActions.SHOW_FILE).pipe(
    tap(action => openAsLink(action.fileUrl)),
    ignoreElements()
  );
};

export const addFolder = (
  action$: ActionsObservable<FileActions.AddFolder>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(FileActions.ADD_FOLDER).pipe(
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
              new FileActions.AddFolderSuccess(
                translate('message.header.folderCreated'),
                undoAction
              )
          ),
          catchError(() => of(new FileActions.AddFolderFailure()))
        );
    })
  );
};

export const moveFiles = (
  action$: ActionsObservable<FileActions.MoveFiles>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(FileActions.MOVE_FILES).pipe(
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
              new FileActions.MoveFilesSuccess(
                translate('message.header.filesMoved'),
                undoAction
              )
          ),
          catchError(() => of(new FileActions.MoveFilesFailure()))
        );
    })
  );
};

export const copyFiles = (
  action$: ActionsObservable<FileActions.CopyFiles>,
  state$: StateObservable<RootState>,
  dependencies: {
    undoActionResolverService: UndoActionResolverService;
    apiService: ApiService;
  }
): Observable<Action> => {
  return action$.ofType(FileActions.COPY_FILES).pipe(
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
              new FileActions.CopyFilesSuccess(
                translate('message.header.filesCopied'),
                undoAction
              )
          ),
          catchError(() => of(new FileActions.CopyFilesFailure()))
        );
    })
  );
};

export const clipboardSelectionAction = (
  action$: ActionsObservable<FileActions.ClipboardSelectionActions>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<void> => {
  return action$
    .ofType(FileActions.CLIPBOARD_COPY_FILE, FileActions.CLIPBOARD_CUT_FILE)
    .pipe(
      switchMap(action => {
        const params: Record<string, string> = {};

        action.contextItems.forEach(contextItem => {
          params[`CB[el][_FILE|${contextItem.clipboardIdentifier}]`] =
            contextItem.identifier;
        });

        params['CB[setCopyMode]'] =
          action.type === FileActions.CLIPBOARD_COPY_FILE ? '1' : '0';

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
  action$: ActionsObservable<FileActions.ClipboardPaste>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(FileActions.CLIPBOARD_PASTE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('CB[paste]', 'FILE|' + action.targetIdentifier);
      formData.append('CB[pad]', CLIPBOARD_PAD);
      return dependencies.apiService
        .postFormData(getUrl('fileActionUrl'), formData)
        .pipe(
          map(
            () =>
              new FileActions.ClipboardPasteSuccess(
                translate('message.header.filesMoved')
              )
          ),
          catchError(() => of(new FileActions.ClipboardPasteFailure()))
        );
    })
  );
};

export const downloadFiles = (
  action$: ActionsObservable<FileActions.DownloadFiles>
): Observable<Action> => {
  return action$.ofType(FileActions.DOWNLOAD_FILES).pipe(
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
        map(() => new FileActions.DownloadFilesSuccess()),
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
          return of(new FileActions.DownloadFilesFailure());
        })
      );
    })
  );
};

export const editFileStorage = (
  action$: ActionsObservable<FileActions.EditFileStorage>
): Observable<Action> => {
  return action$.ofType(FileActions.EDIT_FILE_STORAGE).pipe(
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
  action$: ActionsObservable<FileActions.ReplaceFileConfirm>,
  state$: StateObservable<RootState>,
  dependencies: { modalService: ModalService }
): Observable<Action> => {
  return action$.ofType(FileActions.REPLACE_FILE_CONFIRM).pipe(
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
        </form>`
        .split('\n')
        .join('');

      return dependencies.modalService
        .openModal({
          title: translate('file_replace.pagetitle'),
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
          map(data => new FileActions.ReplaceFile(data.actionData ?? {}))
        );
    })
  );
};

export const replaceFile = (
  action$: ActionsObservable<FileActions.ReplaceFile>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(FileActions.REPLACE_FILE).pipe(
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
              new FileActions.ReplaceFileSuccess(
                translate('file_replace.pagetitle')
              )
          ),
          catchError(() => of(new FileActions.ReplaceFileFailure()))
        );
    })
  );
};

export const undoFileAction = (
  action$: ActionsObservable<FileActions.UndoFilesAction>,
  state$: StateObservable<RootState>,
  dependencies: { apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(FileActions.UNDO_FILES_ACTION).pipe(
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
              new FileActions.UndoFilesActionSuccess(
                translate('message.header.undo')
              )
          ),
          catchError(() => of(new FileActions.UndoFilesActionFailure()))
        );
    })
  );
};

export const fileActionSuccess = (
  action$: ActionsObservable<FileActions.SuccessAction>
): Observable<Action> => {
  return action$
    .ofType(
      FileActions.ADD_FOLDER_SUCCESS,
      FileActions.DELETE_FILES_SUCCESS,
      FileActions.RENAME_FILE_SUCCESS,
      FileActions.UPLOAD_FILES_SUCCESS,
      FileActions.MOVE_FILES_SUCCESS,
      FileActions.COPY_FILES_SUCCESS,
      FileActions.CLIPBOARD_PASTE_SUCCESS,
      FileActions.REPLACE_FILE_SUCCESS,
      FileActions.UNDO_FILES_ACTION_SUCCESS
    )
    .pipe(
      mergeMap(action => [
        new GlobalActions.Reload(),
        new GlobalActions.LoadFlashMessages(
          SeverityEnum.ok,
          action.message,
          action.undoAction
        ),
      ])
    );
};

export const fileActionFailure = (
  action$: ActionsObservable<FileActions.Actions>
): Observable<Action> => {
  return action$
    .ofType(
      FileActions.DELETE_FILES_FAILURE,
      FileActions.RENAME_FILE_FAILURE,
      FileActions.UPLOAD_FILES_FAILURE,
      FileActions.MOVE_FILES_FAILURE,
      FileActions.COPY_FILES_FAILURE,
      FileActions.CLIPBOARD_PASTE_FAILURE,
      FileActions.REPLACE_FILE_FAILURE,
      FileActions.UNDO_FILES_ACTION_FAILURE
    )
    .pipe(
      mergeMap(action => {
        const actions: Action[] = [
          new GlobalActions.LoadFlashMessages(
            SeverityEnum.error,
            translate('message.header.genericError')
          ),
        ];
        if (
          [
            FileActions.RENAME_FILE_FAILURE,
            FileActions.ADD_FOLDER_FAILURE,
            FileActions.MOVE_FILES_FAILURE,
            FileActions.COPY_FILES_FAILURE,
            FileActions.UPLOAD_FILES_FAILURE,
          ].indexOf(action.type) != -1
        ) {
          actions.push(new GlobalActions.Reload());
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
  action$: ActionsObservable<FileActions.EditFileMetadata>
): Observable<Action> => {
  return action$.ofType(FileActions.EDIT_FILE_METADATA).pipe(
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
