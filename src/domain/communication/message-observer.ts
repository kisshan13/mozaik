export interface MessageObserver<TMessage> {
    onMessage(message: TMessage): Promise<void> | void
}