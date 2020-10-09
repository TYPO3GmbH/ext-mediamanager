import { expect, fixture, html } from '@open-wc/testing';
import '../src/topbar/typo3-topbar.js';
import { Typo3Topbar } from '../src/topbar/Typo3Topbar';

describe('Typo3Topbar', () => {
  let element: Typo3Topbar;
  beforeEach(async () => {
    element = await fixture(html` <typo3-topbar></typo3-topbar> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
  });
});
