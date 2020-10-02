import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/typo3-button.js';
import { Typo3Button } from '../src/Typo3Button.js';

describe('Typo3Button', () => {
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

  it('dispatches a btn-click event on click', async () => {
    setTimeout(() => element._handleClick());
    const { detail } = await oneEvent(element, 'btn-click');
    expect(detail).to.be.true;
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
