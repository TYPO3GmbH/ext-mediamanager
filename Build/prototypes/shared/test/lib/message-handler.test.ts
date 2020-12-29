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
