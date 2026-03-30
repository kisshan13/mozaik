import { BaseEvent } from "../event/base"
import { InferenceEndedEvent } from "../event/inference-ended"
import { ToolExecutedEvent } from "../event/tool-executed"
import { UserMessageEvent } from "../event/user-message"
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
			if (event instanceof ToolExecutedEvent) {
				listener.toolExecutedListener(event)
			} else if (event instanceof InferenceEndedEvent) {
				listener.inferenceEndedListener(event)
			} else if (event instanceof UserMessageEvent) {
				listener.userMessageListener(event)
			}
		}
	}

	abstract process(initiator: string, input: TInput): Promise<void>
}
