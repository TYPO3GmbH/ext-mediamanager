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
import '../src/typo3-breadcrumb.js';
import { Typo3breadcrumb } from '../src/typo3-breadcrumb';

describe('Typo3breadcrumb', () => {
  let element: Typo3breadcrumb;
  beforeEach(async () => {
    element = await fixture(html` <typo3-breadcrumb></typo3-breadcrumb> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3breadcrumb);
  });
});
