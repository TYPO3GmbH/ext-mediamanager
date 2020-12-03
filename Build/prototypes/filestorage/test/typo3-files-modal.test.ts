import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-files-modal.js';
import { Typo3FilesModal } from '../src/typo3-files-modal';

describe('Typo3FilesModal', () => {
  let element: Typo3FilesModal;
  beforeEach(async () => {
    element = await fixture(html` <typo3-files-modal></typo3-files-modal> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3FilesModal);
  });
});
