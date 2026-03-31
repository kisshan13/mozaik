import { InferenceResult } from "../processor/inference"
import { BaseEvent } from "./base"

export class InferenceEndedEvent extends BaseEvent {
	readonly result: InferenceResult

	constructor(
		id: string,
		type: string,
		timestamp: Date,
		metadata: Record<string, unknown>,
		initiator: string,
		result: InferenceResult,
	) {
		super(id, type, timestamp, metadata, initiator)
		this.result = result
	}

	getResult(): InferenceResult {
		return this.result
	}
}
