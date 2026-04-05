export class InferenceResult<R> {
	readonly contextSummary: string
	readonly contextWindow: ContextWindow
	readonly timestamp: Date
	readonly rawResponse: R

	constructor(contextSummary: string, contextWindow: ContextWindow, timestamp: Date, rawResponse: R) {
		this.contextSummary = contextSummary
		this.contextWindow = contextWindow
		this.rawResponse = rawResponse
		this.timestamp = timestamp
	}
}
