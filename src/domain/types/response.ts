type UsageEntry = {
	inputTokens: number
	outputTokens: number
	model: string
}

export type InferenceResponse = {
	data: any
	usage: {
		entries: UsageEntry[]
		totalUsdCost: number
	}
}
