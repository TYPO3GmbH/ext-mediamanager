import { expect, fixture, html } from '@open-wc/testing';
import '../src/button/typo3-button.js';
import { Typo3Button } from '../src/button/Typo3Button.js';

describe('Typo3Button.ts', () => {
  let element: Typo3Button;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-button label="Label">Hello World</typo3-button>
    `);
  });

  it('renders a button', () => {
    const button = element.shadowRoot!.querySelector('button')!;
    expect(button).to.exist;
  });

  it('renders a button with label', () => {
    const label = element.shadowRoot!.querySelector('#label')!;
    expect(label).to.exist;
  });

  it('renders a button with aria label', () => {
    const button = element.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-label')).to.be.equal('Label');
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
