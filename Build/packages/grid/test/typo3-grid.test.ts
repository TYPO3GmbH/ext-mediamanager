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
import '../src/typo3-grid.js';
import { Typo3Grid } from '../src/typo3-grid';
import { Typo3Card } from '../../card/src/typo3-card';
import exp from 'constants';

describe('Typo3Grid', () => {
  let element: Typo3Grid;
  let cardItemOne: Typo3Card;
  let cardItemTwo: Typo3Card;
  let cardItemThree: Typo3Card;

  beforeEach(async () => {
    element = await fixture(html`
      <typo3-grid selectable>
        <typo3-card selectable slot="item" id="card-1"></typo3-card>
        <typo3-card selectable slot="item" id="card-2"></typo3-card>
        <typo3-card selectable slot="item" id="card-3"></typo3-card>
      </typo3-grid>
    `);
    cardItemOne = element.querySelector('#card-1') as Typo3Card;
    cardItemTwo = element.querySelector('#card-2') as Typo3Card;
    cardItemThree = element.querySelector('#card-3') as Typo3Card;
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
  });

  it('fires `typo3-grid-selection-changed` and selects exclusively on click on a item (no prev selection)', async () => {
    const listener = oneEvent(element, 'typo3-grid-selection-changed');
    cardItemOne.click();
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.true;

    const { detail } = await listener;
    expect(detail).to.be.eql([cardItemOne]);
  });

  it('fires `typo3-grid-selection-changed` and selects exclusively on click on a item (prev selection)', async () => {
    cardItemOne.setAttribute('selected', 'selected');
    const listener = oneEvent(element, 'typo3-grid-selection-changed');
    cardItemTwo.click();
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.false;
    expect(cardItemTwo.hasAttribute('selected')).to.be.true;

    const { detail } = await listener;
    expect(detail).to.be.eql([cardItemTwo]);
  });

  it('fires `typo3-grid-selection-changed` and extends selection on click on a item with ctrl key (prev selection)', async () => {
    cardItemOne.setAttribute('selected', 'selected');
    const listener = oneEvent(element, 'typo3-grid-selection-changed');
    const event = new MouseEvent('click', { ctrlKey: true });
    Object.defineProperty(event, 'target', {
      value: cardItemTwo,
      enumerable: true,
    });
    (cardItemTwo.assignedSlot as HTMLSlotElement).dispatchEvent(event);

    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.true;
    expect(cardItemTwo.hasAttribute('selected')).to.be.true;

    const { detail } = await listener;
    expect(detail).to.be.eql([cardItemOne, cardItemTwo]);
  });

  it('fires `typo3-grid-selection-changed` and reduce selection on click on a previous selected item with ctrl key', async () => {
    cardItemOne.setAttribute('selected', 'selected');
    const listener = oneEvent(element, 'typo3-grid-selection-changed');

    const event = new MouseEvent('click', { ctrlKey: true });
    Object.defineProperty(event, 'target', {
      value: cardItemOne,
      enumerable: true,
    });

    (cardItemOne.assignedSlot as HTMLSlotElement).dispatchEvent(event);
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.false;
    expect(cardItemTwo.hasAttribute('selected')).to.be.false;

    const { detail } = await listener;
    expect(detail).to.be.eql([]);
  });

  it('fires no `typo3-grid-selection-changed` on click on a item when `selectable` is `false', async () => {
    element.selectable = false;
    let selectionChangedCount = 0;

    element.addEventListener('typo3-grid-selection-changed', (): void => {
      selectionChangedCount += 1;
    });

    cardItemOne.click();
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.false;

    expect(selectionChangedCount).to.equal(0);
  });

  it('fires `typo3-grid-selection-changed` with empty selection on `Escape`', async () => {
    cardItemOne.setAttribute('selected', 'selected');
    const listener = oneEvent(element, 'typo3-grid-selection-changed');

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    element.dispatchEvent(event);

    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.false;
    expect(cardItemTwo.hasAttribute('selected')).to.be.false;

    const { detail } = await listener;
    expect(detail).to.be.eql([]);
  });

  it('fires `typo3-grid-selection-changed` with all items on `ctrl a`', async () => {
    const listener = oneEvent(element, 'typo3-grid-selection-changed');

    const event = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true });
    element.dispatchEvent(event);

    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.true;
    expect(cardItemTwo.hasAttribute('selected')).to.be.true;
    expect(cardItemThree.hasAttribute('selected')).to.be.true;

    const { detail } = await listener;
    expect(detail).to.be.eql([cardItemOne, cardItemTwo, cardItemThree]);
  });

  it('will focus next element on arrow right`', async () => {
    cardItemOne.focus();
    await elementUpdated(element);
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(document.activeElement).to.be.eq(cardItemTwo);
  });

  it('will focus previous element on arrow left`', async () => {
    cardItemTwo.focus();
    await elementUpdated(element);
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(document.activeElement).to.be.eq(cardItemOne);
  });

  it('will focus first element on home`', async () => {
    cardItemThree.focus();
    await elementUpdated(element);
    const event = new KeyboardEvent('keydown', { key: 'Home' });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(document.activeElement).to.be.eq(cardItemOne);
  });

  it('will focus last element on end`', async () => {
    cardItemOne.focus();
    await elementUpdated(element);
    const event = new KeyboardEvent('keydown', { key: 'End' });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(document.activeElement).to.be.eq(cardItemThree);
  });

  it('selects exclusively on keydown "Enter" on a item (no prev selection)', async () => {
    cardItemOne.focus();
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.true;
  });

  it('selects current and left item on arrow left with shift key pressed`', async () => {
    cardItemTwo.focus();
    await elementUpdated(element);
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      shiftKey: true,
    });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.true;
    expect(cardItemTwo.hasAttribute('selected')).to.be.true;
  });

  it('selects current and right item on arrow right with shift key pressed`', async () => {
    cardItemOne.focus();
    await elementUpdated(element);
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      shiftKey: true,
    });
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(cardItemOne.hasAttribute('selected')).to.be.true;
    expect(cardItemTwo.hasAttribute('selected')).to.be.true;
  });
});
