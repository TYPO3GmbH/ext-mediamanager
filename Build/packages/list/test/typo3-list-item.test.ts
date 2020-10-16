import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-list-item-base.js';
import { Typo3ListItemBase } from '../src/typo3-list-item-base';

describe('Typo3list', () => {
  let element: Typo3ListItemBase;
  beforeEach(async () => {
    element = await fixture(html` <typo3-list-item></typo3-list-item> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).is.instanceOf(Typo3ListItemBase);
  });
});
