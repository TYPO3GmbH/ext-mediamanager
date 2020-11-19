import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export const renameItem = (
  fileActionUrl: string,
  uid: string,
  name: string
): ThunkAction<Promise<void>, {}, {}, Action> => {
  console.log('rename Action....', fileActionUrl, uid, name);

  return (dispatch: ThunkDispatch<Action, {}, Action>): Promise<void> => {
    const formData = new FormData();
    formData.append('data[rename][0][data]', uid);
    formData.append('data[rename][0][target]', name);

    return fetch(fileActionUrl, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.warn('todo: handle error. catched error');
      });
  };
};
