/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

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
