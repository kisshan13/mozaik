export class UsageEntry {
	inputTokens: number
	outputTokens: number
	model: string
	totalTokens: number

	constructor(inputTokens: number, outputTokens: number, model: string) {
		this.inputTokens = inputTokens
		this.outputTokens = outputTokens
		this.model = model
		this.totalTokens = inputTokens + outputTokens
	}
}
