import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-breadcrumb.js';
import { Typo3breadcrumb } from '../src/typo3-breadcrumb';

describe('Typo3breadcrumb', () => {
  let element: Typo3breadcrumb;
  beforeEach(async () => {
    element = await fixture(html` <typo3-breadcrumb></typo3-breadcrumb> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.not.null;
  });
});
