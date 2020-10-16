import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-dropdown-item.js';
import { Typo3DropdownItem } from '../src/typo3-dropdown-item';

describe('Typo3DropdownItem', () => {
  let element: Typo3DropdownItem;
  beforeEach(async () => {
    element = await fixture(
      html` <typo3-dropdown-item></typo3-dropdown-item> `
    );
  });

  it('can create component', () => {
    expect(element).to.not.be.not.null;
    expect(element).to.be.instanceOf(Typo3DropdownItem);
  });
});
