import { expect, fixture, html } from '@open-wc/testing';
import '../src/alert/typo3-alert.js';
import { Typo3Alert } from '../src/alert/Typo3Alert';

describe('Typo3Alert', () => {
  let element: Typo3Alert;
  beforeEach(async () => {
    element = await fixture(html` <typo3-alert title="500"></typo3-alert> `);
  });

  it('displays the `title` attribute', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;

    expect(root).to.not.be.null;
    expect(root.textContent).to.contain('500');
  });
});
