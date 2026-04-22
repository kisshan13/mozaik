import { ContextItem } from "@domain/context/context-item"
import { TokenUsage } from "@domain/generative-model/token-usage"

export class InferenceResponse {
	readonly contextItems: ContextItem[]
	readonly tokenUsage?: TokenUsage

	constructor(contextItems: ContextItem[], tokenUsage: TokenUsage | undefined) {
		this.contextItems = contextItems
		this.tokenUsage = tokenUsage
	}
}
