import { ReasoningEffort } from "./capabilities/reasoning-effort"
import { StreamingCapability } from "./capabilities/streaming"
import { ToolCallingCapability } from "./capabilities/tool-calling"

export type ModelSpecification = {
	name: string
	supportReasoningEffort: boolean
	defaultReasoningEffort: string | undefined
	supportStreaming: boolean
	contextWindowSize: number
	maxOutputTokens: number
	supportFunctionCalling: boolean
}

export interface GenerativeModel extends ReasoningEffort<string>, ToolCallingCapability, StreamingCapability {
	readonly specification: ModelSpecification
}
