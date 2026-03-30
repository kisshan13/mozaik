export interface Tool {
	name: string
	description: string
	inputSchema: ToolInputSchema
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

export abstract class BaseTool implements Tool {
	constructor(
		public readonly name: string,
		public readonly description: string,
		public readonly inputSchema: ToolInputSchema,
		public readonly kind: ToolKind,
	) {}

	abstract execute(args: ToolArgs): Promise<unknown>
}
