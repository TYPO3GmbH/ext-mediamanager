export class MessageData<T = undefined> {
  constructor(public readonly type: string, public detail?: T) {}
}
