import { ModelPricing } from "./pricing"

export type ReasoningEffort = "none" | "low" | "medium" | "high" | "max"

export class ModelCapabilities {
	readonly name: string
	readonly provider: string
	readonly contextWindowCapacity: number
	readonly maxOutputTokens: number
	readonly knowledgeCutoffDate: string
	readonly reasoningTokenSupport: boolean
	readonly defaultReasoningEffort: ReasoningEffort
	readonly pricing: ModelPricing

	constructor(
		name: string,
		provider: string,
		contextWindowCapacity: number,
		maxOutputTokens: number,
		knowledgeCutoffDate: string,
		reasoningTokenSupport: boolean,
		defaultReasoningEffort: ReasoningEffort,
		pricing: ModelPricing,
	) {
		this.name = name
		this.provider = provider
		this.contextWindowCapacity = contextWindowCapacity
		this.maxOutputTokens = maxOutputTokens
		this.knowledgeCutoffDate = knowledgeCutoffDate
		this.reasoningTokenSupport = reasoningTokenSupport
		this.defaultReasoningEffort = defaultReasoningEffort
		this.pricing = pricing
	}
}
