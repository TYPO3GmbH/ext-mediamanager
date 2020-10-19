import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-list-item.js';
import { Typo3ListItem } from '../src/typo3-list-item';

describe('Typo3list', () => {
  let element: Typo3ListItem;
  beforeEach(async () => {
    element = await fixture(html` <typo3-list-item></typo3-list-item> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).is.instanceOf(Typo3ListItem);
  });
});
