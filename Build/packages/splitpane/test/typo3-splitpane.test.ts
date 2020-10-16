import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-splitpane.js';
import { Typo3Splitpane } from '../src/typo3-splitpane';

describe('Typo3Splitpane', () => {
  let element: Typo3Splitpane;
  beforeEach(async () => {
    element = await fixture(html` <typo3-splitpane></typo3-splitpane> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Splitpane);
  });
});
