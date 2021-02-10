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
import '../src/typo3-search.js';
import { Typo3Search } from '../src/typo3-search';

describe('Typo3Search', () => {
  let element: Typo3Search;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-search label="SearchLabel" placeholder="SearchPlaceholder">
        <svg slot="search-icon" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="black"
            stroke-width="3"
            fill="red"
          />
        </svg>
      </typo3-search>
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Search);
  });

  it('renders placeholder', () => {
    const input = element.shadowRoot!.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.placeholder).to.be.eq('SearchPlaceholder');
  });

  it('renders aria label', () => {
    const input = element.shadowRoot!.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.getAttribute('aria-label')).to.be.equal('SearchLabel');
  });

  it('renders search-icon slot content', () => {
    const titleSlot = element.shadowRoot!.querySelector(
      ' [name="search-icon"]'
    ) as HTMLSlotElement;

    expect(titleSlot, 'did not find slot element').to.not.be.null;
    expect(titleSlot.assignedElements().length).to.be.eq(1);
  });

  it('renders search-icon slot content', () => {
    const titleSlot = element.shadowRoot!.querySelector(
      ' [name="search-icon"]'
    ) as HTMLSlotElement;

    expect(titleSlot, 'did not find slot element').to.not.be.null;
    expect(titleSlot.assignedElements().length).to.be.eq(1);
  });

  it('can be cleared via "Escape"', async () => {
    element.value = 'SomeValue';

    await elementUpdated(element);

    const form = element.shadowRoot!.querySelector('form') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    form.dispatchEvent(event);

    await elementUpdated(element);

    expect(element.value).to.equal('');
  });

  it('can be cleared via reset button', async () => {
    element.value = 'SomeValue';

    await elementUpdated(element);

    const button = element.shadowRoot!.querySelector(
      'typo3-button'
    ) as HTMLElement;
    const event = new MouseEvent('click');
    button.dispatchEvent(event);

    await elementUpdated(element);

    expect(element.value).to.equal('');
  });

  it('will dispatch `typo3-search-change` on "Escape"', async () => {
    element.value = 'SomeValue';

    await elementUpdated(element);

    const listener = oneEvent(element, 'typo3-search-change');

    const form = element.shadowRoot!.querySelector('form') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    form.dispatchEvent(event);

    await elementUpdated(element);

    const { detail } = await listener;
    expect(detail).to.be.eq('');
  });

  it('will dispatch `typo3-search-change` on input change', async () => {
    element.value = 'SomeValue';

    await elementUpdated(element);

    const listener = oneEvent(element, 'typo3-search-change');

    const input = element.shadowRoot!.querySelector('input') as HTMLElement;

    const event = new Event('input');
    input.dispatchEvent(event);

    await elementUpdated(element);

    const { detail } = await listener;
    expect(detail).to.be.eq('SomeValue');
  });

  it('will dispatch `typo3-search-submit` on submit', async () => {
    element.value = 'SomeValue';

    const listener = oneEvent(element, 'typo3-search-submit');

    await elementUpdated(element);

    const form = element.shadowRoot!.querySelector('form') as HTMLElement;
    const event = new Event('submit');
    form.dispatchEvent(event);

    await elementUpdated(element);

    const { detail } = await listener;
    expect(detail).to.be.eq('SomeValue');
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
