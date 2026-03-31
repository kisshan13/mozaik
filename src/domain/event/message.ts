import { BaseEvent } from "./base"

export class MessageEvent extends BaseEvent {
	readonly message: string
	readonly messageData: unknown

	constructor(
		id: string,
		type: string,
		timestamp: Date,
		metadata: Record<string, unknown>,
		initiator: string,
		message: string,
		messageData: unknown,
	) {
		super(id, type, timestamp, metadata, initiator)
		this.message = message
		this.messageData = messageData
	}
}
