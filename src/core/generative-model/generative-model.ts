export type ModelSpecification = {
	name: string
	supportReasoningEffort: boolean
	defaultReasoningEffort: string | undefined
	supportStreaming: boolean
}

export interface GenerativeModel {
	readonly specification: ModelSpecification
}
