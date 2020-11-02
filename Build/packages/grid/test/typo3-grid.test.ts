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

describe('Typo3Grid', () => {
  let element: Typo3Grid;
  let cardItemOne: Typo3Card;
  let cardItemTwo: Typo3Card;

  beforeEach(async () => {
    element = await fixture(html`
      <typo3-grid selectable>
        <typo3-card slot="item" id="card-1"></typo3-card>
        <typo3-card slot="item" id="card-2"></typo3-card>
      </typo3-grid>
    `);
    cardItemOne = element.querySelector('#card-1') as Typo3Card;
    cardItemTwo = element.querySelector('#card-2') as Typo3Card;
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
});
