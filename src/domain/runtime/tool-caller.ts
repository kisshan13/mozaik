import { Tool, ToolArgs } from "./tool"

export interface ToolCaller {
	callTool(tool: Tool, args: ToolArgs): Promise<unknown>
}
