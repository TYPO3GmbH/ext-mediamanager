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

import { expect, oneEvent } from '@open-wc/testing';
import { MessageHandler } from '../../src/lib/message-handler';

describe('Message Handler', () => {
  it('can send post messages between iframes', async () => {
    const listener = oneEvent(top, 'message');
    MessageHandler.sendPostMessage([top], { detail: 'Hello World' });

    const event = await listener;
    expect(event).to.exist;
  });
});
