import { html, fixture, expect } from '@open-wc/testing';

import {Typo3Filelist} from '../src/Typo3Filelist.js';
import '../src/typo3-filelist.js';

describe('Typo3Filelist', () => {
  let element: Typo3Filelist;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-filelist title="My app"></typo3-filelist>
    `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });
});
