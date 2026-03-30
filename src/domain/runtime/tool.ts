export interface Tool {
	name: string
	description: string
	inputSchema: ToolInputSchema
	kind: ToolKind
	execute(args: ToolArgs): Promise<unknown>
}

export type ToolArgs = Record<string, unknown>

export type ToolInputSchema = Record<string, unknown>

type ToolKind = "custom" | "inference"

export abstract class BaseTool implements Tool {
	constructor(
	  public readonly name: string,
	  public readonly description: string,
	  public readonly inputSchema: ToolInputSchema,
	  public readonly kind: ToolKind
	) {}
  
	abstract execute(args: ToolArgs): Promise<unknown>
}

export abstract class InferenceTool extends BaseTool {
	readonly kind = "inference"
  
	constructor() {
	  super(
		"LLM inference",
		"Calls LLM to infer the answer",
		{},
		"inference"
	  )
	}
  
	async execute(args: ToolArgs): Promise<unknown> {
	  return this.infer(args)
	}
  
	protected abstract infer(args: ToolArgs): Promise<unknown>
}