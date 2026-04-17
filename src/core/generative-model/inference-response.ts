import { ContextItem } from "src"
import { TokenUsage } from "./token-usage"

export class InferenceResponse {
	readonly contextItems: ContextItem[]
	readonly tokenUsage?: TokenUsage

	constructor(contextItems: ContextItem[], tokenUsage: TokenUsage | undefined) {
		this.contextItems = contextItems
		this.tokenUsage = tokenUsage
	}
}
