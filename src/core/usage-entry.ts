export class UsageEntry {
	inputTokens: number
	outputTokens: number
	cachedInputTokens: number
	model: string

	constructor(inputTokens: number, outputTokens: number, cachedInputTokens: number, model: string) {
		this.inputTokens = inputTokens
		this.outputTokens = outputTokens
		this.cachedInputTokens = cachedInputTokens
		this.model = model
	}
}
