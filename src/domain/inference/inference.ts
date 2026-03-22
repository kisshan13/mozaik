export class Inference {
	readonly contextSummary: string
	readonly contextWindow: ContextWindow
	readonly timestamp: Date
	readonly response?: string

	constructor(contextSummary: string, contextWindow: ContextWindow, timestamp: Date, response?: string) {
		this.contextSummary = contextSummary
		this.contextWindow = contextWindow
		this.response = response
		this.timestamp = timestamp
	}
}
