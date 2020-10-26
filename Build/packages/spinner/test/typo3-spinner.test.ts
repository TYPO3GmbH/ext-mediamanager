import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-spinner.js';
import { Typo3Spinner } from '../src/typo3-spinner';

describe('Typo3Spinner', () => {
  let element: Typo3Spinner;
  beforeEach(async () => {
    element = await fixture(html` <typo3-spinner></typo3-spinner> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Spinner);
  });
});
