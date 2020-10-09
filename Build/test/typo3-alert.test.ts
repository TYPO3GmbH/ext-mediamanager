import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '../src/alert/typo3-alert.js';
import { Typo3Alert } from '../src/alert/Typo3Alert';

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

  it('displays a close button when dismissable', async () => {
    const dismissableAlert = await fixture(
      html` <typo3-alert dismissable="true">Alert</typo3-alert> `
    );
    const closeButton = dismissableAlert.shadowRoot!.querySelector(
      '#btn-close'
    );
    expect(closeButton).not.to.be.null;
  });

  it('can close alert when dismissable', async () => {
    const dismissableAlert = (await fixture(
      html` <typo3-alert dismissable="true">Alert</typo3-alert> `
    )) as Typo3Alert;
    const closeButton = dismissableAlert.shadowRoot!.querySelector(
      '#btn-close'
    ) as HTMLButtonElement;
    closeButton.click();

    await elementUpdated(dismissableAlert);

    const alertDiv = dismissableAlert.shadowRoot!.querySelector('#alert')!;
    expect(alertDiv).to.be.null;
  });

  it('can not close alert when not dismissable', async () => {
    element.close();

    await elementUpdated(element);

    const alertDiv = element.shadowRoot!.querySelector('#alert')!;
    expect(alertDiv).not.to.be.null;
  });
});
