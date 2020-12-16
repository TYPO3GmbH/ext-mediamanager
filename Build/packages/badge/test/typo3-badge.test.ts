import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-badge.js';
import { Typo3Badge } from '../src/typo3-badge';

describe('Typo3Badge', () => {
  let element: Typo3Badge;
  beforeEach(async () => {
    element = await fixture(html` <typo3-badge>500</typo3-badge> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Badge);
  });

  it('displays the slot content', () => {
    expect(element.textContent).to.contain('500');
  });
});
