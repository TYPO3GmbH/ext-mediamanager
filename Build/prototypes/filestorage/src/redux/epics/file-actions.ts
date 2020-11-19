import { ActionsObservable } from 'redux-observable';

import * as fromActions from '../ducks/file-actions';
import { ignoreElements, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export const renameFile = (
  action$: ActionsObservable<fromActions.RenameFile>
) => {
  return action$.ofType(fromActions.RENAME_FILE).pipe(
    switchMap(action => {
      const formData = new FormData();
      formData.append('data[rename][0][data]', action.identifier);
      formData.append('data[rename][0][target]', action.name);
      // todo handle error etc

      return ajax.post(action.fileActionUrl, formData);
    }),
    ignoreElements()
  );
};
