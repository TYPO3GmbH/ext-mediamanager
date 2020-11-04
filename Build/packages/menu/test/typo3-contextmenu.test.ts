import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '../src/typo3-context-menu.js';
import '../src/typo3-menu';
import { Typo3ContextMenu } from '../src/typo3-context-menu';

describe('Typo3ContextMenu', () => {
  let element: Typo3ContextMenu;
  const defaultOptions = {
    delete: {
      callbackAction: 'createFile',
      icon: '',
      label: 'New File',
      type: 'item',
    },
    divider1: { type: 'divider' },
    history: {
      callbackAction: 'createDirectory',
      icon: '',
      label: 'New Folder',
      type: 'item',
    },
  };

  const showContextMenuEvent = new CustomEvent('typo3-show-context-menu', {
    detail: {
      options: defaultOptions,
      sourceEvent: new MouseEvent('click', {}),
    },
  });

  beforeEach(async () => {
    element = await fixture(html` <typo3-context-menu></typo3-context-menu>`);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3ContextMenu);
  });

  it('has a closed typo3-menu by default', () => {
    expect(element.typo3Menu.open).to.be.false;
  });

  it('opens typo3-menu when `typo3-show-context-menu` event is fired', async () => {
    window.dispatchEvent(showContextMenuEvent);

    await elementUpdated(element);
    expect(element.typo3Menu.open).to.be.true;
  });

  it('fires a `typo3-context-menu-open` when `contextmenu` event on `typo3-show-context-menu`', async () => {
    const listener = oneEvent(element, 'typo3-context-menu-open');
    window.dispatchEvent(showContextMenuEvent);
    await elementUpdated(element);

    const event = await listener;
    expect(event).to.exist;
  });

  it('fires a `typo3-context-menu-close` on `closed`', async () => {
    const listener = oneEvent(element, 'typo3-context-menu-close');
    element.typo3Menu.dispatchEvent(new CustomEvent('closed'));
    const event = await listener;

    expect(event).to.exist;
  });

  it('renders options as `typo3-menu-item`s', async () => {
    window.dispatchEvent(showContextMenuEvent);
    await elementUpdated(element);

    const items = element.shadowRoot!.querySelectorAll('typo3-menu-item');
    expect(items.length).to.be.equal(2);

    expect(items[0].textContent).to.contain('New File');
    expect(items[1].textContent).to.contain('New Folder');
  });

  it('renders divder option as divider item', async () => {
    window.dispatchEvent(showContextMenuEvent);
    await elementUpdated(element);

    const items = element.shadowRoot!.querySelectorAll('[divider]');
    expect(items.length).to.be.equal(1);
  });

  it('fires `typo3-context-menu-item-click` on item click', async () => {
    window.dispatchEvent(showContextMenuEvent);
    await elementUpdated(element);

    const listener = oneEvent(window, 'typo3-context-menu-item-click');

    const firstItem = element.shadowRoot!.querySelector('typo3-menu-item')!;
    (firstItem as HTMLElement).click();

    const { detail } = await listener;
    expect(detail.option).to.include({
      callbackAction: 'createFile',
      icon: '',
      label: 'New File',
      type: 'item',
    });
  });
});
