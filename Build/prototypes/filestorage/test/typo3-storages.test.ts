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
