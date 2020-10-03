import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Typo3Button } from '../src/button/Typo3Button';

describe('Typo3Button.ts', () => {
  let element: Typo3Button;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-button label="Hello World"></typo3-button>
    `);
  });

  it('renders a button', () => {
    const button = element.shadowRoot!.querySelector('button')!;
    expect(button).to.exist;
  });

  it('renders a button with label', () => {
    const buttonLabel = element.shadowRoot!.textContent;
    expect(buttonLabel).to.exist;
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
