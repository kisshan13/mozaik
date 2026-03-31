import { BaseEvent } from "./base"

export class InferenceEndedEvent extends BaseEvent {
	readonly llmResponse: unknown

	constructor(
		id: string,
		type: string,
		timestamp: Date,
		metadata: Record<string, unknown>,
		initiator: string,
		llmResponse: unknown,
	) {
		super(id, type, timestamp, metadata, initiator)
		this.llmResponse = llmResponse
	}

}
