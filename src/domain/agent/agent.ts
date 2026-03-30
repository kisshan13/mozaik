import { BaseEvent } from "../event/base-event"
import { Listener } from "../runtime/listener"
import { ToolCaller } from "../runtime/tool-caller"
import { InferenceTool, Tool, ToolArgs, ToolInputProcessor } from "../runtime/tool"
import { ToolProcessor } from "../processor/tool-processor"

export class Agent implements ToolCaller, Listener {
	readonly toolProcessor: ToolProcessor
	readonly inferenceTool: InferenceTool
	readonly inferenceArgs: ToolArgs

	constructor(
		private readonly id: string,
		toolProcessor: ToolProcessor,
		inferenceTool: InferenceTool,
		inferenceArgs: ToolArgs,
	) {
		this.id = id
		this.toolProcessor = toolProcessor
		this.inferenceTool = inferenceTool
		this.inferenceArgs = inferenceArgs
	}

	getId(): string {
		return this.id
	}

	getToolProcessor(): ToolProcessor {
		return this.toolProcessor
	}

	callTool(tool: Tool, args: ToolArgs): Promise<unknown> {
		const toolInput: ToolInputProcessor = { tool, args }
		return this.toolProcessor.process(this.id, toolInput)
	}

	async listen(event: BaseEvent) {
		if (event.getInitiator() === this.id && event.getType() === "tool_executed") {
			this.callTool(this.inferenceTool, this.inferenceArgs)
		}

		if (event.getType() === "user_message") {
			this.callTool(this.inferenceTool, this.inferenceArgs)
		}
	}
}
