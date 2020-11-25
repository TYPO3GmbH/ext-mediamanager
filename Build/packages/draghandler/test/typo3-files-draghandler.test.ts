import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-files-draghandler.js';
import { Typo3FilesDraghandler } from '../src/typo3-files-draghandler';

describe('Typo3FilesDraghandler', () => {
  let element: Typo3FilesDraghandler;
  beforeEach(async () => {
    element = await fixture(
      html` <typo3-files-draghandler></typo3-files-draghandler> `
    );
  });
  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3FilesDraghandler);
  });
});
