import { BaseEvent } from "../event/base-event"
import { Listener, ListenerId } from "../runtime/listener"

export abstract class BaseProcessor<TInput, TEvent extends BaseEvent> {
	readonly listeners: Map<ListenerId, Listener>

	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		this.listeners = listeners
	}

	getListeners(): Map<ListenerId, Listener> {
		return this.listeners
	}

	notify(event: TEvent) {
		for (const listener of this.listeners.values()) {
			listener.listen(event)
		}
	}

	abstract process(initiator: string, input: TInput): Promise<void>
}
