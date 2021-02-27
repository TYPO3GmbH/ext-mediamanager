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

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { Typo3Menu } from '../src/typo3-menu';

describe('Typo3Menu', () => {
  let element: Typo3Menu;

  beforeEach(async () => {
    element = await fixture(html` <typo3-menu></typo3-menu>`);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Menu);
  });

  it('fires a `typo3-menu-open` on open', async () => {
    const listener = oneEvent(element, 'typo3-menu-open');
    element.open = true;
    await elementUpdated(element);
    const event = await listener;
    expect(event).to.exist;
  });

  it('fires a `typo3-menu-close` on close', async () => {
    element.open = true;
    await elementUpdated(element);
    element.open = false;
    await elementUpdated(element);
    const listener = oneEvent(element, 'typo3-menu-close');
    const event = await listener;
    expect(event).to.exist;
  });
});
