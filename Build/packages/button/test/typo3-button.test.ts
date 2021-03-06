/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '../src/typo3-button.js';
import { Typo3Button } from '../src/typo3-button';

describe('Typo3Button.ts', () => {
  let element: Typo3Button;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-button label="Label">Hello World</typo3-button>
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Button);
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
