import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-dropdown-button.js';
import { Typo3DropdownButton } from '../src/typo3-dropdown-button';

describe('Typo3DropdownButton.ts', () => {
  let element: HTMLElement;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-dropdown-button label="Label">Hello World</typo3-dropdown-button>
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3DropdownButton);
  });

  it('renders a dropdown button', () => {
    const button = element.shadowRoot!.querySelector('button')!;
    expect(button).to.exist;
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
