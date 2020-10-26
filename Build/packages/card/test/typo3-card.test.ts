import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '../src/typo3-card.js';
import { Typo3Card } from '../src/typo3-card';

describe('Typo3Card', () => {
  let element: Typo3Card;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-card title="Hello Title" subtitle="Hello Subtitle"></typo3-card>
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Card);
  });

  it('displays the `title` attribute as `.title`', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleEl = root.querySelector('.title');

    expect(titleEl).to.not.be.null;
    expect((titleEl as HTMLDivElement).textContent).to.contain('Hello Title');
  });

  it('displays the `subtitle` attribute as `.subtitle`', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;
    const subtitleEl = root.querySelector('.subtitle');

    expect(subtitleEl).to.not.be.null;
    expect((subtitleEl as HTMLDivElement).textContent).to.contain(
      'Hello Subtitle'
    );
  });

  it('marks selectable card as selected on click', async () => {
    element.selectable = true;
    const root = element.shadowRoot ? element.shadowRoot : element;

    const card = root.querySelector('.card') as HTMLElement;
    card.click();

    await elementUpdated(element);
    expect(card.hasAttribute('selected')).to.be.true;
    expect(element.hasAttribute('selected')).to.be.true;
  });

  it('triggers `typo3-card-selected` on selection', async () => {
    element.selectable = true;
    const root = element.shadowRoot ? element.shadowRoot : element;
    const card = root.querySelector('.card') as HTMLElement;

    const listener = oneEvent(element, 'typo3-card-selected');

    card.click();
    const event = await listener;
    expect(event).to.exist;
  });

  it('marks selected selectable card as unselected on click', async () => {
    element.selectable = true;
    element.selected = true;
    const root = element.shadowRoot ? element.shadowRoot : element;

    const card = root.querySelector('.card') as HTMLElement;
    card.click();

    await elementUpdated(element);
    expect(card.hasAttribute('selected')).to.be.false;
    expect(element.hasAttribute('selected')).to.be.false;
  });

  it('triggers `typo3-card-unselected` on unselection', async () => {
    element.selectable = true;
    element.selected = true;
    const root = element.shadowRoot ? element.shadowRoot : element;
    const card = root.querySelector('.card') as HTMLElement;

    const listener = oneEvent(element, 'typo3-card-unselected');

    card.click();
    const event = await listener;
    expect(event).to.exist;
  });
});
