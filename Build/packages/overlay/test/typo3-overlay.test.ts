import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-overlay.js';
import { Typo3Overlay } from '../src/typo3-overlay';

describe('Typo3Overlay', () => {
  let element: Typo3Overlay;
  beforeEach(async () => {
    element = await fixture(html` <typo3-overlay></typo3-overlay> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Overlay);
  });
});
