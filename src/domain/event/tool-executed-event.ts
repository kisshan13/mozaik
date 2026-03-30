import { BaseEvent } from "./base-event"
import { ToolArgs } from "../runtime/tool"

export class ToolExecutedEvent extends BaseEvent {
	readonly toolName: string
	readonly toolDescription: string
	readonly toolArgs: ToolArgs
	readonly result: unknown

	constructor(
		id: string,
		type: string,
		timestamp: Date,
		metadata: Record<string, unknown>,
		initiator: string,
		toolName: string,
		toolDescription: string,
		toolArgs: ToolArgs,
		result: unknown,
	) {
		super(id, type, timestamp, metadata, initiator)
		this.toolName = toolName
		this.toolDescription = toolDescription
		this.toolArgs = toolArgs
		this.result = result
	}
}
