import { MessageObserver } from "./message-observer"

export interface MessageSender<TMessage> {
    send(message: TMessage): Promise<void> | void
    subscribe(observer: MessageObserver<TMessage>): void
    unsubscribe(observer: MessageObserver<TMessage>): void
    getSubscribers(): MessageObserver<TMessage>[]
}