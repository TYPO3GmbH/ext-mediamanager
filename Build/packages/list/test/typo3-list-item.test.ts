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
