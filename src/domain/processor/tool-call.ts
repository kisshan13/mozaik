import { Processor } from "./processor"
import { Tool, ToolArgs } from "../runtime/tool"
import { ToolExecutedEvent } from "../event/tool-executed"
import { ToolCallSuggestion } from "./inference"

export class ToolCallProcessor extends Processor<ToolCallSuggestion, ToolExecutedEvent> {
	async process(initiator: string, tool: Tool, toolArgs: ToolArgs): Promise<void> {
		const result = await tool.execute(toolArgs)
		const event = new ToolExecutedEvent(crypto.randomUUID(), "tool_executed", new Date(), {}, initiator, tool.name, tool.description, toolArgs, result)
		this.publish(event)
	}
}
