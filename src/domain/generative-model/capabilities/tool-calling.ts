import { Tool } from "../tool"

export interface ToolCallingCapability {
	setTools(tools: Tool[]): void
	getTools(): Tool[]
}
