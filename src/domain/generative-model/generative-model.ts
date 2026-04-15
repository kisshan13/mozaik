import { Context } from "../context-runtime/context"
import { ContextItem } from "../context-runtime/context-item"

export interface Usage {
	readonly inputTokens: number
	readonly outputTokens: number
	readonly reasoningTokens: number
	readonly cachedTokens: number
	readonly cost: number
}

export abstract class GenerativeModel {
	abstract infer(context: Context): Promise<ContextItem[]>
}
