import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-topbar.js';
import { Typo3Topbar } from '../src/typo3-topbar';

describe('Typo3Topbar', () => {
  let element: Typo3Topbar;
  beforeEach(async () => {
    element = await fixture(html` <typo3-topbar></typo3-topbar> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Topbar);
  });
});
