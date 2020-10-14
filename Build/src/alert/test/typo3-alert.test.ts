import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { Typo3Alert } from '../src/typo3-alert';

describe('Typo3Alert', () => {
  let element: Typo3Alert;
  beforeEach(async () => {
    element = await fixture(html` <typo3-alert>Alert</typo3-alert> `);
  });

  it('displays the slot content', () => {
    expect(element.textContent).to.contain('Alert');
  });

  it('displays no close button on default', () => {
    const closeButton = element.shadowRoot!.querySelector('#btn-close')!;
    expect(closeButton).to.be.null;
  });

  it('displays a close button when dismissible', async () => {
    const dismissibleAlert = await fixture(
      html` <typo3-alert dismissible="true">Alert</typo3-alert> `
    );
    const closeButton = dismissibleAlert.shadowRoot!.querySelector(
      '#btn-close'
    );
    expect(closeButton).not.to.be.null;
  });

  it('can dismiss alert when dismissible', async () => {
    const dismissibleAlert = (await fixture(
      html` <typo3-alert dismissible="true">Alert</typo3-alert> `
    )) as Typo3Alert;
    const closeButton = dismissibleAlert.shadowRoot!.querySelector(
      '#btn-close'
    ) as HTMLButtonElement;
    closeButton.click();

    await elementUpdated(dismissibleAlert);

    const alertDiv = dismissibleAlert.shadowRoot!.querySelector('#alert')!;
    expect(alertDiv).to.be.null;
  });

  it('can should dispatch a `typo3-alert-close` event on close', async () => {
    const dismissibleAlert = (await fixture(
      html` <typo3-alert dismissible="true">Alert</typo3-alert> `
    )) as Typo3Alert;
    const listener = oneEvent(dismissibleAlert, 'typo3-alert-close');

    const closeButton = dismissibleAlert.shadowRoot!.querySelector(
      '#btn-close'
    ) as HTMLButtonElement;
    closeButton.click();

    const event = await listener;
    expect(event).to.exist;
  });

  it('can not close alert when not dismissible', async () => {
    element.close();

    await elementUpdated(element);

    const alertDiv = element.shadowRoot!.querySelector('#alert')!;
    expect(alertDiv).not.to.be.null;
  });
});
