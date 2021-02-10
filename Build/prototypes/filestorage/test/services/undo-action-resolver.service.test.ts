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

import { expect } from '@open-wc/testing';
import { UndoActionResolverService } from '../../src/services/undo-action-resolver.service';
import {
  AddFolder,
  CopyFiles,
  MoveFiles,
  RenameFile,
  UndoFilesAction,
  UploadFiles,
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

  it('will return `UndoAction` for `CopyFiles` ', () => {
    const action = new CopyFiles(['1:/test/hello.jpg', '1:/test/dir/'], {
      identifier: '1:/new_dir',
    } as Typo3Node);
    const response = {
      response: {
        copy: [{ identifier: '/new_dir/hello.jpg' }, '/new_dir/dir'],
      },
    } as AjaxResponse;

    const undoAction = service.getUndoAction(action, response, state);

    expect(undoAction).to.be.instanceOf(UndoFilesAction);
    expect(undoAction?.formData).to.be.eql({
      'data[delete][0][data]': '1:/new_dir/hello.jpg',
      'data[delete][1][data]': '1:/new_dir/dir',
    });
  });

  it('will return `UndoAction` for `AddFolder` ', () => {
    const action = new AddFolder(
      { name: 'New' } as Typo3Node,
      { identifier: '1:/test/dir/' } as Typo3Node
    );
    const response = {
      response: {
        newfolder: ['/test/dir/new/'],
      },
    } as AjaxResponse;

    const undoAction = service.getUndoAction(action, response, state);

    expect(undoAction).to.be.instanceOf(UndoFilesAction);
    expect(undoAction?.formData).to.be.eql({
      'data[delete][0][data]': '1:/test/dir/new/',
    });
  });

  it('will return `UndoAction` for `UploadFiles` ', () => {
    const action = new UploadFiles(
      {} as DataTransfer,
      { identifier: '1:/test/dir/' } as Typo3Node
    );
    const response = {
      response: {
        upload: [
          { id: '1:/test/dir/test1.jpg' },
          { id: '1:/test/dir/test2.jpg' },
        ],
      },
    } as AjaxResponse;

    const undoAction = service.getUndoAction(action, response, state);

    expect(undoAction).to.be.instanceOf(UndoFilesAction);
    expect(undoAction?.formData).to.be.eql({
      'data[delete][0][data]': '1:/test/dir/test1.jpg',
      'data[delete][1][data]': '1:/test/dir/test2.jpg',
    });
  });
});
