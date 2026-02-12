type UsageEntry = {
    inputTokens: number
	outputTokens: number
	model: string
}

export type MozaikResponse = {
    data: any,
    usageEntries: UsageEntry[]
}