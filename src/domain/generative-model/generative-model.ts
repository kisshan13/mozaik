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
	abstract mapContextToRequest(context: Context): any[]
	abstract extractContextItems(response: any): ContextItem[]
	abstract infer(request: any): Promise<any>

	async call(context: Context): Promise<ContextItem[]> {
		const request = this.mapContextToRequest(context)
		const response = await this.infer(request)
		return this.extractContextItems(response)
	}
}
