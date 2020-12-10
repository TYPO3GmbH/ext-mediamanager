export class MessageData<T = unknown> {
  constructor(
    public readonly type: string,
    public detail?: T
  ): MessageData<T> {}
}
