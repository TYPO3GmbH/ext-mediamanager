import { expect, fixture, html } from '@open-wc/testing';
import '../src/badge/typo3-badge.js';
import { Typo3Badge } from '../src/badge/Typo3Badge';

describe('Typo3Badge', () => {
  let element: Typo3Badge;
  beforeEach(async () => {
    element = await fixture(html` <typo3-badge title="500"></typo3-badge> `);
  });

  it('displays the `title` attribute', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;

    expect(root).to.not.be.null;
    expect(root.textContent).to.contain('500');
  });
});
