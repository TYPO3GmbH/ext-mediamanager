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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-dropdown.js';
import { Typo3Dropdown } from '../src/typo3-dropdown';
import { Typo3Menu } from '../../menu/src/typo3-menu';

describe('Typo3Dropdown', () => {
  let element: Typo3Dropdown;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-dropdown>
        <button slot="button"></button>
      </typo3-dropdown>
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.not.null;
    expect(element).to.be.instanceOf(Typo3Dropdown);
  });

  it('opens dropdown menu on button click', async () => {
    const buttonSlot = element.shadowRoot!.querySelector(
      ' [name="button"]'
    ) as HTMLSlotElement;

    (buttonSlot.assignedElements()[0] as HTMLButtonElement).click();

    const menu = element.shadowRoot!.querySelector('typo3-menu') as Typo3Menu;
    await elementUpdated(element);
    expect(menu.open).to.be.true;
  });

  it('adds active attribute to button on dropdown open', async () => {
    element.onMenuOpen();
    await elementUpdated(element);

    const buttonSlot = element.shadowRoot!.querySelector(
      ' [name="button"]'
    ) as HTMLSlotElement;

    const button = buttonSlot.assignedElements()[0] as HTMLButtonElement;
    expect(button.hasAttribute('active')).to.be.true;
  });

  it('removes active attribute from button on dropdown close', async () => {
    element.onMenuClose();
    await elementUpdated(element);

    const buttonSlot = element.shadowRoot!.querySelector(
      ' [name="button"]'
    ) as HTMLSlotElement;

    const button = buttonSlot.assignedElements()[0] as HTMLButtonElement;
    expect(button.hasAttribute('active')).to.be.false;
  });
});
