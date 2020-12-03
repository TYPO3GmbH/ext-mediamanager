import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-storages.js';
import { Typo3Storages } from '../src/typo3-storages';

describe('Typo3Storages', () => {
  let element: Typo3Storages;
  beforeEach(async () => {
    element = await fixture(html` <typo3-storages></typo3-storages> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Storages);
  });
});
