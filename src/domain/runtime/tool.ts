export interface Tool {
	name: string
	description: string
	inputSchema: ToolInputSchema
	execute(args: ToolArgs): Promise<unknown>
}

export type ToolArgs = Record<string, unknown>

export type ToolInputSchema = Record<string, unknown>