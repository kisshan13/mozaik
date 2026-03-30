import { ExecutionEvent } from "../runtime/execution-event"
import { Listener } from "../runtime/listener"
import { ToolCaller } from "../runtime/tool-caller"
import { InferenceTool, Tool, ToolArgs } from "../runtime/tool"
import { ToolExecutor } from "../runtime/tool-executor"

export class Agent implements ToolCaller, Listener {

	readonly toolExecutor: ToolExecutor
	readonly inferenceTool: InferenceTool
	readonly inferenceArgs: ToolArgs

	constructor(
		private readonly id: string,
		toolExecutor: ToolExecutor,
		inferenceTool: InferenceTool,
		inferenceArgs: ToolArgs,
	) {
		this.id = id
		this.toolExecutor = toolExecutor
		this.inferenceTool = inferenceTool
		this.inferenceArgs = inferenceArgs
	}

	getId(): string {
		return this.id
	}

	getToolExecutor(): ToolExecutor {
		return this.toolExecutor
	}

	callTool(tool: Tool, args: ToolArgs): Promise<unknown> {
		return this.toolExecutor.execute(this.id, tool, args)
	}

	async listen(event: ExecutionEvent) {

		if (event.getInitiator() === this.id && event.getType() === "tool_executed") {
			this.callTool(this.inferenceTool, this.inferenceArgs)
		}

		if (event.getType() === "user_message") {
			this.callTool(this.inferenceTool, this.inferenceArgs)
		}

	}
}
