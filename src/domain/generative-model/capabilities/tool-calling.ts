import { Tool } from "@domain/generative-model/tool"

export interface ToolCallingCapability {
	setTools(tools: Tool[]): void
	getTools(): Tool[]
}
