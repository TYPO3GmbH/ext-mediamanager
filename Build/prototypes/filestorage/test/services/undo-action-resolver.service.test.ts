import { expect } from '@open-wc/testing';
import { UndoActionResolverService } from '../../src/services/undo-action-resolver.service';
import {
  MoveFiles,
  RenameFile,
  UndoFilesAction,
} from '../../src/redux/ducks/file-actions';
import { AjaxResponse } from 'rxjs/ajax';
import { RootState } from '../../src/redux/ducks';
import { Typo3Node } from '../../../../packages/filetree/src/lib/typo3-node';

describe('UndoActionResolverService', () => {
  let service: UndoActionResolverService;

  const state = {
    list: {
      items: [
        {
          identifier: '1:/test/hello.jpg',
          name: 'hello.jpg',
          parentIdentifier: '1:/test/',
        },
      ],
    },
    tree: {
      nodes: [
        {
          identifier: '1:/test/dir/',
          parentIdentifier: '1:/test/',
        },
      ],
    },
  } as RootState;

  beforeEach(async () => {
    service = new UndoActionResolverService();
  });

  it('will return `UndoAction` for `RenameFile` ', () => {
    const action = new RenameFile('1:/test/hello.jpg', 'world.jpg');
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

  it('will return `UndoAction` for `MoveFiles` ', () => {
    const action = new MoveFiles(['1:/test/hello.jpg', '1:/test/dir/'], {
      identifier: '1:/new_dir',
    } as Typo3Node);
    const response = {
      response: {
        move: [{ identifier: '/new_dir/hello.jpg' }, '/new_dir/dir'],
      },
    } as AjaxResponse;

    const undoAction = service.getUndoAction(action, response, state);

    expect(undoAction).to.be.instanceOf(UndoFilesAction);
    expect(undoAction?.formData).to.be.eql({
      'data[move][0][data]': '1:/new_dir/hello.jpg',
      'data[move][0][target]': '1:/test/',
      'data[move][1][data]': '1:/new_dir/dir',
      'data[move][1][target]': '1:/test/',
    });
  });
});
