export interface EventObserver<TEvent> {
    onEvent(event: TEvent): void
}