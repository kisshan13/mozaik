export interface Tool<Input = unknown, Output = unknown> {
	name: string
	description?: string
	inputSchema?: unknown
	execute(input: Input): Promise<Output>
}
