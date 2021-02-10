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
import '../src/typo3-draghandler.js';
import { Typo3Draghandler } from '../src/typo3-draghandler';

describe('Typo3FilesDraghandler', () => {
  let element: Typo3Draghandler;
  beforeEach(async () => {
    element = await fixture(
      html`
        <typo3-draghandler>
          <svg slot="icon" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="black"
              stroke-width="3"
              fill="red"
            />
          </svg>
          <span slot="title">Move 4 Files</span>
          <span slot="message"
            >Hold &lt;STRG&gt; to copy<br />Press &lt;ESC&gt; to cancel</span
          >
        </typo3-draghandler>
      `
    );
  });
  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Draghandler);
  });

  it('displays title slot content', () => {
    const titleSlot = element.shadowRoot!.querySelector(
      '.draghandler--title [name="title"]'
    ) as HTMLSlotElement;

    expect(titleSlot, 'did not find slot element').to.not.be.null;
    expect(titleSlot.assignedElements()[0].textContent).to.contain(
      'Move 4 Files'
    );
  });

  it('displays icon slot content', () => {
    const titleSlot = element.shadowRoot!.querySelector(
      '.draghandler--icon [name="icon"]'
    ) as HTMLSlotElement;

    expect(titleSlot, 'did not find slot element').to.not.be.null;
    expect(titleSlot.assignedElements().length).to.be.eq(1);
  });

  it('displays title slot content', () => {
    const titleSlot = element.shadowRoot!.querySelector(
      '.draghandler--title [name="title"]'
    ) as HTMLSlotElement;

    expect(titleSlot, 'did not find slot element').to.not.be.null;
    expect(titleSlot.assignedElements()[0].textContent).to.be.equal(
      'Move 4 Files'
    );
  });

  it('displays message slot content', () => {
    const titleSlot = element.shadowRoot!.querySelector(
      '.draghandler--message [name="message"]'
    ) as HTMLSlotElement;

    expect(titleSlot, 'did not find slot element').to.not.be.null;
    expect(titleSlot.assignedElements()[0].textContent).to.contain(
      'Hold <STRG>'
    );
  });
});
