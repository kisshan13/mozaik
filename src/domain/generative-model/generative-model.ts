export interface Usage {
	readonly inputTokens: number
	readonly outputTokens: number
	readonly reasoningTokens: number
	readonly cachedTokens: number
	readonly cost: number
}

export interface GenerativeModel {
	call(request: unknown): unknown
	stream(request: unknown): unknown
	extractTokenUsage(response: unknown): Usage
}
