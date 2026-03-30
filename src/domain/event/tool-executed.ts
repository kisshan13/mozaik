import { BaseEvent } from "./base"
import { ToolArgs } from "../runtime/tool"

export class ToolExecutedEvent extends BaseEvent {
	readonly toolName: string
	readonly toolDescription: string
	readonly toolArgs: ToolArgs
	readonly rawResponse: unknown

	constructor(
		id: string,
		type: string,
		timestamp: Date,
		metadata: Record<string, unknown>,
		initiator: string,
		toolName: string,
		toolDescription: string,
		toolArgs: ToolArgs,
		rawResponse: unknown,
	) {
		super(id, type, timestamp, metadata, initiator)
		this.toolName = toolName
		this.toolDescription = toolDescription
		this.toolArgs = toolArgs
		this.rawResponse = rawResponse
	}
}
