import { expect, fixture, html } from '@open-wc/testing';
import '../src/grid/typo3-grid.js';
import { Typo3Grid } from '../src/grid/Typo3Grid';

describe('Typo3Grid', () => {
  let element: Typo3Grid;
  beforeEach(async () => {
    element = await fixture(html` <typo3-grid></typo3-grid> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
  });
});
