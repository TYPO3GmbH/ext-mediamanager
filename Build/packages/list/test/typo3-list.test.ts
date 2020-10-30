import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-list.js';
import { Typo3List } from '../src/typo3-list';

describe('Typo3list', () => {
  let element: Typo3List;
  beforeEach(async () => {
    element = await fixture(html` <typo3-list></typo3-list> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).is.instanceOf(Typo3List);
  });
});