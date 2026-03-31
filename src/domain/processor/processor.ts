import { EventObserver } from "../communication/event-observer"
import { EventPublisher } from "../communication/event-publisher"
import { BaseEvent } from "../event/base"
import { Tool, ToolArgs } from "../runtime/tool"

export abstract class Processor<TEvent extends BaseEvent> implements EventPublisher<TEvent> {
	private observers: Map<string, EventObserver<TEvent>[]> = new Map()

	subscribe(eventType: string, listener: EventObserver<TEvent>): void {
		const observers = this.observers.get(eventType) || []
		observers.push(listener)
		this.observers.set(eventType, observers)
	}

	publish(event: TEvent) {
		const observers = this.observers.get(event.getType()) || []
		for (const observer of observers) {
			observer.onEvent(event)
		}
	}

	unsubscribe(eventType: string, listener: EventObserver<TEvent>): void {
		const observers = this.observers.get(eventType) || []
		this.observers.set(
			eventType,
			observers.filter((observer) => observer !== listener),
		)
	}
	getSubscribers(eventType: string): EventObserver<TEvent>[] {
		return Array.from(this.observers.get(eventType) || []).map((observer) => observer) as EventObserver<TEvent>[]
	}

	abstract process(initiator: string, tool: Tool, toolArgs: ToolArgs): Promise<void>
}
