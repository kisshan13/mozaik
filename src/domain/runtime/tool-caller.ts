import { ToolExecutor } from "./tool-executor"
import { Tool, ToolArgs } from "./tool"

export abstract class ToolCaller {
	readonly id: string
	tools: Tool[]

	constructor(id: string, tools: Tool[]) {
		this.id = id
		this.tools = tools
	}

	callTool(toolExecutor: ToolExecutor, tool: Tool, args: ToolArgs): Promise<unknown> {
		return toolExecutor.executeTool(tool, args)
	}

}
