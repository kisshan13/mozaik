import { EventObserver } from "./event-observer"

export interface EventPublisher<TEvent> {
    publish(event: TEvent): Promise<void> | void
    subscribe(eventType: string, listener: EventObserver<TEvent>): void
    unsubscribe(eventType: string, listener: EventObserver<TEvent>): void
    getSubscribers(eventType: string): EventObserver<TEvent>[]
}