export interface TokenUsage {
	readonly inputTokens: number
	readonly outputTokens: number
	readonly reasoningTokens: number
	readonly cachedTokens: number
}

export interface GenerativeModel {
	generate(prompt: string): Promise<unknown>
	extractOutput(response: unknown): Promise<unknown>
	extractTokenUsage(response: unknown): Promise<TokenUsage>
	calculateCost(usage: TokenUsage): Promise<number>
}
