import { BaseProcessor } from "./base"
import { Listener, ListenerId } from "../runtime/listener"
import { ToolInputProcessor } from "../runtime/tool"
import { ToolExecutedEvent } from "../event/tool-executed"

export class ToolCallProcessor extends BaseProcessor<ToolInputProcessor, ToolExecutedEvent> {
	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		super(listeners)
	}

	async process(initiator: string, toolInput: ToolInputProcessor): Promise<void> {
		const { tool, args } = toolInput
		const result = await tool.execute(args)
		const toolExecutedEvent = new ToolExecutedEvent(
			crypto.randomUUID(),
			"tool_executed",
			new Date(),
			{},
			initiator,
			tool.name,
			tool.description,
			args,
			result,
		)
		this.notify(toolExecutedEvent)
	}
}
