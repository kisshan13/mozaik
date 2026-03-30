import { BaseProcessor } from "./base"
import { Listener, ListenerId } from "../runtime/listener"
import { BaseEvent } from "../event/base"

export class UserMessageProcessor extends BaseProcessor<unknown, BaseEvent> {
	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		super(listeners)
	}

	process(initiator: string, input: unknown): Promise<void> {
		throw new Error("Method not implemented.")
	}
}
