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

import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-formfield.js';
import { Typo3Formfield } from '../src/typo3-formfield';

describe('Typo3Formfield', () => {
  let element: Typo3Formfield;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-formfield label="Label">
        <input type="text" />
      </typo3-formfield>
    `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Formfield);
  });

  it('renders label', () => {
    const labelElement = element.shadowRoot!.querySelector(
      'label'
    ) as HTMLElement;
    expect(labelElement.textContent).to.be.eq('Label');
  });

  it('renders control as slot content', () => {
    const contentSlot = element.shadowRoot!.querySelector(
      'slot'
    ) as HTMLSlotElement;

    expect(contentSlot, 'did not find slot element').to.not.be.null;
    expect(contentSlot.assignedElements().length).to.be.eq(1);
  });

  it('delegates label click to control click and will focus', async () => {
    const labelEl = element.shadowRoot!.querySelector('label')!;
    const controlEl = element
      .shadowRoot!.querySelector('slot')!
      .assignedElements()[0] as HTMLInputElement;
    let numClicks = 0;

    const contentSlot = element.shadowRoot!.querySelector(
      'slot'
    ) as HTMLSlotElement;

    expect(contentSlot.assignedElements().length).to.be.eq(1);

    controlEl.click = () => {
      numClicks += 1;
    };
    labelEl.click();

    await element.updateComplete;
    expect(numClicks).to.be.eq(1);
    expect(document.activeElement).to.equal(controlEl);
  });
});
