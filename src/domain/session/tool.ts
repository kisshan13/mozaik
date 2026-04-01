export interface Tool {
	name: string
	description: string
	inputSchema?: ToolInputSchema
	type: ToolType
	execute(args: ToolArgs): Promise<unknown>
}

export interface ToolInputProcessor {
	tool: Tool
	args: ToolArgs
}

export type ToolArgs = Record<string, unknown>

export type ToolInputSchema = Record<string, unknown>

export enum ToolType {
	CUSTOM = "custom",
	PROVIDER = "provider",
}

export interface ToolCaller {
	callTool(tool: Tool, args: ToolArgs): Promise<unknown>
}
