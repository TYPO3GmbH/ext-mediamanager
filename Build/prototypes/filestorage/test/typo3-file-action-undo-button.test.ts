import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-file-action-undo-button.js';
import { Typo3FileActionUndoButton } from '../src/typo3-file-action-undo-button';
import { UndoFilesAction } from '../src/redux/ducks/file-actions';

describe('Typo3FileActionUndoButton', () => {
  let element: Typo3FileActionUndoButton;
  beforeEach(async () => {
    const undoAction = new UndoFilesAction({});
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
