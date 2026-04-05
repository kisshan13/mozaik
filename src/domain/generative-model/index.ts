export interface TokenUsage {
	readonly inputTokens: number
	readonly outputTokens: number
	readonly reasoningTokens: number
	readonly cachedTokens: number
}

export interface GenerativeModel {
	generate(prompt: string): unknown
	extractOutput(response: unknown): unknown
	extractTokenUsage(response: unknown): TokenUsage
	calculateCost(usage: TokenUsage): number
}
