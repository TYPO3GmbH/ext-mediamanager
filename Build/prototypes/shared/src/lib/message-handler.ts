export class MessageHandler {
  static sendPostMessage(targets: (Window | null)[], message: {}): void {
    targets
      .filter(target => null !== target)
      .map(target => target as Window)
      .forEach(target => target.postMessage(message, target.origin));
  }
}
