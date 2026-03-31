export interface Tool {
	name: string
	description: string
	inputSchema?: ToolInputSchema
	kind: ToolKind
	execute(args: ToolArgs): Promise<unknown>
}

export interface ToolInputProcessor {
	tool: Tool
	args: ToolArgs
}

export type ToolArgs = Record<string, unknown>

export type ToolInputSchema = Record<string, unknown>

type ToolKind = "custom" | "inference" | "user_input"

export interface ToolCaller {
	callTool(tool: Tool, args: ToolArgs): Promise<unknown>
}
