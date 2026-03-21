import { Pricing } from "./pricing"

export class Model {
	readonly name: string
	readonly provider: string
	readonly contextWindowCapacity: number
	readonly maxOutputTokens: number
	readonly knowledgeCutoffDate: string
	readonly reasoningTokenSupport: boolean
	readonly pricing: Pricing

	constructor(
		name: string,
		provider: string,
		contextWindowCapacity: number,
		maxOutputTokens: number,
		knowledgeCutoffDate: string,
		reasoningTokenSupport: boolean,
		pricing: Pricing,
	) {
		this.name = name
		this.provider = provider
		this.contextWindowCapacity = contextWindowCapacity
		this.maxOutputTokens = maxOutputTokens
		this.knowledgeCutoffDate = knowledgeCutoffDate
		this.reasoningTokenSupport = reasoningTokenSupport
		this.pricing = pricing
	}
}
