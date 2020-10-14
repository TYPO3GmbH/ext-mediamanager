import { expect, fixture, html } from '@open-wc/testing';
import { Typo3DropdownItem } from '../src/typo3-dropdown-item';

describe('Typo3DropdownItem', () => {
  let element: Typo3DropdownItem;
  beforeEach(async () => {
    element = await fixture(html` <typo3-dropdownItem></typo3-dropdownItem> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.not.null;
  });
});
