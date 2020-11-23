import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-filestorage.js';
import { Typo3Filestorage } from '../src/typo3-filestorage';

describe('Typo3Filestorage', () => {
  let element: Typo3Filestorage;
  beforeEach(async () => {
    element = await fixture(html` <typo3-filestorage></typo3-filestorage> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Filestorage);
  });
});
