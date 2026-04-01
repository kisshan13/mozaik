import { Processor } from "./processor"
import { Tool, ToolArgs } from "../runtime/tool"
import { ToolCall } from "../event/tool-executed"

export class ToolCallProcessor extends Processor {
	async process(initiator: string, tool: Tool, toolArgs: ToolArgs): Promise<void> {
		const toolCall = new ToolCall(
			crypto.randomUUID(),
			"tool_call",
			new Date(),
			{},
			initiator,
			tool.name,
			tool.description,
			toolArgs,
			null,
		)
		toolCall.onStart(initiator, tool, toolArgs)
		this.publish("tool_call", toolCall)
		const result = await tool.execute(toolArgs)
		const event = new ToolCall(
			crypto.randomUUID(),
			"tool_executed",
			new Date(),
			{},
			initiator,
			tool.name,
			tool.description,
			toolArgs,
			result,
		)
		this.publish("tool_executed", event)
	}
}
