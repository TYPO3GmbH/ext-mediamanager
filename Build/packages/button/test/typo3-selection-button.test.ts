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
import '../src/typo3-selection-button.js';
import { Typo3SelectionButton } from '../src/typo3-selection-button';

describe('Typo3SelectionButton.ts', () => {
  let element: Typo3SelectionButton;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-selection-button suffix="TestSelected" count="5"
        >Hello World</typo3-selection-button
      >
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3SelectionButton);
  });

  it('renders the current count', () => {
    const textbutton = element.shadowRoot!.querySelector('.button')!;
    expect(textbutton.textContent).to.contain('5 TestSelected');
  });

  it('renders a typo3-button', () => {
    const clearButton = element.shadowRoot!.querySelector('typo3-button')!;
    expect(clearButton.textContent).not.to.be.null;
  });

  it('renders an empty element on count `0`', async () => {
    element.count = 0;
    await elementUpdated(element);
    expect(element.shadowRoot!).to.be.empty;
  });

  it('fires a `typo3-selection-clear` event on clear ', async () => {
    const listener = oneEvent(element, 'typo3-selection-clear');
    const clearButton = element.shadowRoot!.querySelector(
      'typo3-button'
    ) as HTMLButtonElement;
    clearButton.click();

    const event = await listener;
    expect(event).to.exist;
  });

  it('sets count to `0` on clear ', async () => {
    const clearButton = element.shadowRoot!.querySelector(
      'typo3-button'
    ) as HTMLButtonElement;
    clearButton.click();

    await elementUpdated(element);

    expect(element.count).to.be.eq(0);
  });
});
