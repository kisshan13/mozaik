export type ModelSpecification = {
	name: string
	supportReasoningEffort: boolean
	defaultReasoningEffort: string | undefined
	supportStreaming: boolean
	contextWindowSize: number
	maxOutputTokens: number
	supportFunctionCalling: boolean
}

export interface GenerativeModel {
	readonly specification: ModelSpecification
}
