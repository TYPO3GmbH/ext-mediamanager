import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '../src/typo3-modal.js';
import { Typo3Modal } from '../src/typo3-modal';

describe('Typo3Modal', () => {
  let element: Typo3Modal;
  beforeEach(async () => {
    element = await fixture(
      html` <typo3-modal headline="Hello World">Modal</typo3-modal> `
    );
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Modal);
  });

  it('displays the modal headline', async () => {
    element.show();
    await elementUpdated(element);

    const headline = element.shadowRoot!.querySelector('.header')!;
    expect(headline.textContent).to.contain('Hello World');
  });

  it('displays no close button on default', () => {
    const closeButton = element.shadowRoot!.querySelector('#btn-close')!;
    expect(closeButton).to.be.null;
  });

  it('displays a close button when dismissible', async () => {
    const dismissibleModal = await fixture(
      html` <typo3-modal dismissible="true">Modal</typo3-modal> `
    );
    const closeButton = dismissibleModal.shadowRoot!.querySelector(
      '#btn-close'
    );
    expect(closeButton).not.to.be.null;
  });

  it('can dismiss modal when dismissible', async () => {
    const dismissibleModal = (await fixture(
      html` <typo3-modal open dismissible="true">Modal</typo3-modal> `
    )) as Typo3Modal;
    const closeButton = dismissibleModal.shadowRoot!.querySelector(
      '#btn-close'
    ) as HTMLButtonElement;
    closeButton.click();

    await elementUpdated(dismissibleModal);

    const modalDiv = dismissibleModal.shadowRoot!.querySelector('.wrapper')!;
    expect(modalDiv).not.to.have.class('open');
  });

  it('can open modal', async () => {
    element.show();

    await elementUpdated(element);

    const modalDiv = element.shadowRoot!.querySelector('.wrapper')!;
    expect(modalDiv).to.have.class('open');
  });

  it('should dispatch a `typo3-modal-close` event on close', async () => {
    const dismissibleModal = (await fixture(
      html` <typo3-modal open dismissible>Modal</typo3-modal> `
    )) as Typo3Modal;
    const listener = oneEvent(dismissibleModal, 'typo3-modal-close');

    const closeButton = dismissibleModal.shadowRoot!.querySelector(
      '#btn-close'
    ) as HTMLButtonElement;
    closeButton.click();

    const event = await listener;
    expect(event).to.exist;
  });

  it('should dispatch a `typo3-modal-open` event on open', async () => {
    const listener = oneEvent(element, 'typo3-modal-open');

    element.show();

    const event = await listener;
    expect(event).to.exist;
  });

  it('can not close modal when not dismissible', async () => {
    element.close();

    await elementUpdated(element);

    const modalDiv = element.shadowRoot!.querySelector('#modal')!;
    expect(modalDiv).not.to.be.null;
  });

  it('will close dismissible modal on `Escape`', async () => {
    const dismissibleModal = (await fixture(
      html` <typo3-modal dismissible="true">Modal</typo3-modal> `
    )) as Typo3Modal;

    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    dismissibleModal.dispatchEvent(event);

    await elementUpdated(dismissibleModal);
    expect(dismissibleModal.open).to.be.false;
  });
});
