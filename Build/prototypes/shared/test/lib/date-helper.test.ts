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

import { expect } from '@open-wc/testing';
import { DateHelper } from '../../src/lib/date-helper';

describe('DateHelper', () => {
  it('can format milliseconds to a "YYYY-MM-DD HH:mm" formatted string', () => {
    expect(DateHelper.formatDate(1614348935000)).to.be.eq('2021-02-26 15:15');
  });
});
