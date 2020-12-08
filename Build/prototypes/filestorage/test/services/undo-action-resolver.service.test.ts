import { expect } from '@open-wc/testing';
import { UndoActionResolverService } from '../../src/services/undo-action-resolver.service';
import {
  RenameFile,
  UndoFilesAction,
} from '../../src/redux/ducks/file-actions';
import { AjaxResponse } from 'rxjs/ajax';
import { RootState } from '../../src/redux/ducks';

describe('UndoActionResolverService', () => {
  let service: UndoActionResolverService;

  beforeEach(async () => {
    service = new UndoActionResolverService();
  });

  it('will return `UndoAction` for `RenameFile` ', () => {
    const action = new RenameFile('1:/test/hello.jpg', 'world.jpg');

    const state = {
      list: {
        items: [
          {
            identifier: '1:/test/hello.jpg',
            name: 'hello.jpg',
          },
        ],
      },
      tree: {
        nodes: [
          {
            identifier: '1:/test',
          },
        ],
      },
    } as RootState;

    const response = {
      response: {
        rename: ['/test/world.jpg'],
      },
    } as AjaxResponse;

    const undoAction = service.getUndoAction(action, response, state);

    expect(undoAction).to.be.instanceOf(UndoFilesAction);
    expect(undoAction?.formData).to.be.eql({
      'data[rename][0][data]': '1:/test/world.jpg',
      'data[rename][0][target]': 'hello.jpg',
    });
  });
});
