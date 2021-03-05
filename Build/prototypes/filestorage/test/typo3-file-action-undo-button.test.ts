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

import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-file-action-undo-button.js';
import { Typo3FileActionUndoButton } from '../src/typo3-file-action-undo-button';
import { FileActions } from '../src/redux/ducks/actions';

describe('Typo3FileActionUndoButton', () => {
  let element: Typo3FileActionUndoButton;
  beforeEach(async () => {
    const undoAction = new FileActions.UndoFilesAction({});
    element = await fixture(
      html`
        <typo3-file-action-undo-button
          .undoAction="${undoAction}"
        ></typo3-file-action-undo-button>
      `
    );
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3FileActionUndoButton);
  });

  it('will render `undo` button', () => {
    const button = element.shadowRoot!.querySelector('typo3-button');
    expect(button).to.exist;
  });
});
