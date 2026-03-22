import { ReasoningEffort } from "./inference"
import { Pricing } from "./pricing"

export class Model {
	readonly name: string
	readonly provider: string
	readonly contextWindowCapacity: number
	readonly maxOutputTokens: number
	readonly knowledgeCutoffDate: string
	readonly reasoningTokenSupport: boolean
	readonly defaultReasoningEffort: ReasoningEffort
	readonly pricing: Pricing

	constructor(
		name: string,
		provider: string,
		contextWindowCapacity: number,
		maxOutputTokens: number,
		knowledgeCutoffDate: string,
		reasoningTokenSupport: boolean,
		defaultReasoningEffort: ReasoningEffort,
		pricing: Pricing,
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
