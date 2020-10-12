import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
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

  it('should dispatch a `click` event on button click', async () => {
    const button = element.shadowRoot!.querySelector(
      'button'
    )! as HTMLButtonElement;
    const listener = oneEvent(element, 'click');

    button.click();

    const event = await listener;
    expect(event).to.exist;
  });

  it('should not dispatch a `click` event on button click if button is disabled', async () => {
    let clickEventsCount = 0;

    element.disabled = true;
    element.onclick = (): void => {
      clickEventsCount += 1;
    };

    await elementUpdated(element);

    const button = element.shadowRoot!.querySelector(
      'button'
    )! as HTMLButtonElement;
    button.click();

    expect(clickEventsCount).to.equal(0);
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
