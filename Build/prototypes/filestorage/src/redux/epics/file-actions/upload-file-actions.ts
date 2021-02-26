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
import * as fromActions from '../../ducks/file-actions';
import { RootState } from '../../ducks';
import { ModalService } from '../../../services/modal.service';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { Action } from 'redux';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  ModalData,
  ModalType,
} from '../../../../../shared/src/types/modal-data';
import { ModalVariant } from '../../../../../../packages/modal/src/lib/modal-variant';
import { translate } from '../../../services/translation.service';
import { UndoActionResolverService } from '../../../services/undo-action-resolver.service';
import { ApiService } from '../../../services/api.service';
import { getUrl } from '../../../services/backend-url.service';
import {
  ConflictFileDto,
  Typo3File,
} from '../../../../../shared/src/types/conflict-file-dto';
import * as _ from 'lodash-es';

function handleFilesUpload(
  files: File[],
  targetIdentifier: string,
  apiService: ApiService,
  overrideMode?: string
): Observable<Action> {
  const formData = new FormData();
  files.forEach((file, i) => {
    formData.append('data[upload][' + i + '][target]', targetIdentifier);
    formData.append('data[upload][' + i + '][data]', i.toString());
    formData.append('upload_' + i, file);

    if (overrideMode) {
      formData.append('overwriteExistingFiles', overrideMode);
    }
  });

  return apiService.postFormData(getUrl('fileActionUrl'), formData).pipe(
    mergeMap(() => {
      const actions: Action[] = [
        new fromActions.UploadFilesSuccess(
          translate('message.header.filesUploaded')
        ),
      ];
      return actions;
    }),
    catchError(() => of(new fromActions.UploadFilesFailure()))
  );
}

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

        return dependencies.apiService.getJSON<Typo3File>(url);
      });

      return forkJoin(fileExistsChecks).pipe(
        map(results => {
          const uploadableFiles: File[] = [];
          const conflictFiles: ConflictFileDto[] = [];

          files.forEach(file => {
            const existingFile = _.find(results, { name: file.name });
            if (existingFile) {
              const conflictFileDto: ConflictFileDto = {
                original: existingFile,
                file: file,
                data: {
                  name: file.name,
                  lastModified: file.lastModified,
                  size: file.size,
                },
              };
              conflictFiles.push(conflictFileDto);
            } else {
              uploadableFiles.push(file);
            }
          });

          return {
            uploadableFiles: uploadableFiles,
            conflictFiles: conflictFiles,
            target: action.node,
          };
        })
      );
    }),
    switchMap(data => {
      const observables = [];
      if (data.uploadableFiles.length > 0) {
        observables.push(
          handleFilesUpload(
            data.uploadableFiles,
            data.target.identifier,
            dependencies.apiService
          )
        );
      }
      if (data.conflictFiles.length > 0) {
        observables.push(
          of(
            new fromActions.UploadFilesConflicts(
              data.conflictFiles,
              data.target
            )
          )
        );
      }
      return concat(...observables);
    })
  );
};

export const uploadFilesConflict = (
  action$: ActionsObservable<fromActions.UploadFilesConflicts>,
  state$: StateObservable<RootState>,
  dependencies: { modalService: ModalService; apiService: ApiService }
): Observable<Action> => {
  return action$.ofType(fromActions.UPLOAD_FILES_CONFLICTS).pipe(
    switchMap(action => {
      const modalData: ModalData = {
        type: ModalType.HTML,
        isForm: true,
        headline: translate('file_upload.existingfiles.title'),
        content: `<typo3-files-override-modal-content files='${JSON.stringify(
          action.files
        )}'></typo3-files-override-modal-content>`,
        dismissible: true,
        variant: ModalVariant.warning,
        modalButtons: [
          {
            label: translate('button.cancel'),
            color: 'default',
            action: 'typo3-files-conflict-cancel',
          },
          {
            label: translate('file_upload.button.continue'),
            color: 'warning',
            action: 'typo3-files-conflict-confirm',
          },
        ],
      };

      return dependencies.modalService.openModal(modalData).pipe(
        filter(data => 'typo3-files-conflict-confirm' === data.actionName),
        switchMap(data => {
          const formData = data.actionData as Record<string, string>;
          const overrideAction = formData['data[all]'];

          const uploadActions: Observable<Action>[] = [];
          action.files.forEach(conflictFile => {
            const overrideFileAction =
              formData[`data[file][${conflictFile.file?.name}]`] ||
              overrideAction;

            if (overrideFileAction === 'cancel') {
              return null;
            }
            uploadActions.push(
              handleFilesUpload(
                [conflictFile.file as File],
                action.node.identifier,
                dependencies.apiService,
                overrideFileAction
              )
            );
          });

          return concat(...uploadActions);
        })
      );
    })
  );
};
