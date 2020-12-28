export class MessageHandler {
  static sendPostMessage(target: Window | null, message: {}): void {
    if (null === target) {
      throw new Error('post message target is null');
    }

    target.postMessage(message, target.origin);
  }
}
