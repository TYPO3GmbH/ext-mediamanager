import { expect, fixture, html } from '@open-wc/testing';
import { Typo3Dropdown } from '../src/typo3-dropdown';

describe('Typo3Dropdown', () => {
  let element: Typo3Dropdown;
  beforeEach(async () => {
    element = await fixture(html` <typo3-dropdown></typo3-dropdown> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.not.null;
  });
});
