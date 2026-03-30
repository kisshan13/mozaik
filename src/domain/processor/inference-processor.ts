import { BaseProcessor } from "./base-processor"
import { Listener, ListenerId } from "../runtime/listener"
import { BaseEvent } from "../event/base-event"

export class InferenceProcessor extends BaseProcessor<unknown, BaseEvent> {
	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		super(listeners)
	}

	process(initiator: string, input: unknown): Promise<void> {
		throw new Error("Method not implemented.")
	}
}
