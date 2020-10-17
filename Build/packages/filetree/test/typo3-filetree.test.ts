import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-filetree.js';
import { Typo3Filetree } from '../src/typo3-filetree';

describe('Typo3Filetree', () => {
  let element: Typo3Filetree;
  beforeEach(async () => {
    element = await fixture(html` <typo3-filetree></typo3-filetree> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Filetree);
  });
});
