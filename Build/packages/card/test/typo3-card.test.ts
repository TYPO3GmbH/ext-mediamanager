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

  it('toggles edit mode on `click` if `titleEditable`', async () => {
    element.titleEditable = true;
    await elementUpdated(element);
    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;

    titleElement.dispatchEvent(new MouseEvent('click'));

    await elementUpdated(element);

    expect(titleElement.contentEditable).to.be.eq('true');
    expect(element.inEditMode).to.be.true;
  });

  it('wont toggle edit mode on `click` if `titleEditable` is false', async () => {
    element.titleEditable = false;

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;

    titleElement.dispatchEvent(new MouseEvent('click'));

    await elementUpdated(element);

    expect(titleElement.contentEditable).not.to.be.eq('true');
  });

  it('will reset title on blur', async () => {
    element.titleEditable = true;
    element.inEditMode = true;

    await elementUpdated(element);

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;
    titleElement.textContent = 'Hello World';
    titleElement.dispatchEvent(new FocusEvent('blur'));
    titleElement.blur();

    await elementUpdated(element);

    expect(titleElement.textContent).to.be.eq('Hello Title');
  });

  it('fires a `typo3-card-title-rename` on blur if content has changed', async () => {
    element.titleEditable = true;
    element.inEditMode = true;

    await elementUpdated(element);

    const listener = oneEvent(element, 'typo3-card-title-rename');

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;
    titleElement.textContent = 'Hello World';
    titleElement.dispatchEvent(new FocusEvent('blur'));

    titleElement.blur();

    await elementUpdated(element);

    const { detail } = await listener;
    expect(detail).to.be.eq('Hello World');
  });

  it('wont fire a `typo3-card-title-rename` on blur if content has not changed', async () => {
    element.titleEditable = true;
    element.inEditMode = true;

    await elementUpdated(element);

    let renameEventsCount = 0;

    element.addEventListener('typo3-card-title-rename', () => {
      renameEventsCount += 1;
    });

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;
    titleElement.dispatchEvent(new FocusEvent('blur'));

    await elementUpdated(element);

    expect(renameEventsCount).to.equal(0);
  });

  it('fires a `typo3-card-title-rename` on `Enter` if content has changed', async () => {
    element.titleEditable = true;
    element.inEditMode = true;

    await elementUpdated(element);

    const listener = oneEvent(element, 'typo3-card-title-rename');

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;
    titleElement.textContent = 'Hello World';
    titleElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    await elementUpdated(element);

    const { detail } = await listener;
    expect(detail).to.be.eq('Hello World');
  });

  it('fires a `typo3-card-title-rename` on `Tab` if content has changed', async () => {
    element.titleEditable = true;
    element.inEditMode = true;

    await elementUpdated(element);

    const listener = oneEvent(element, 'typo3-card-title-rename');

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;
    titleElement.textContent = 'Hello World';
    titleElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

    await elementUpdated(element);

    const { detail } = await listener;
    expect(detail).to.be.eq('Hello World');
  });

  it('wont fire a `typo3-card-title-rename` `Escape` if content has changed', async () => {
    element.titleEditable = true;
    element.inEditMode = true;

    await elementUpdated(element);

    let renameEventsCount = 0;

    element.addEventListener('typo3-card-title-rename', () => {
      renameEventsCount += 1;
    });

    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleElement = root.querySelector('.title') as HTMLElement;
    titleElement.textContent = 'Hello World';
    titleElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    await elementUpdated(element);

    expect(renameEventsCount).to.equal(0);
  });
});
