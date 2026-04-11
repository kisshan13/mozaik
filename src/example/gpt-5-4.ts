import { GenerativeModel, Usage } from "@generative-model/generative-model"
import OpenAI from "openai"
import { Condition } from "src/domain/context-engine/condition/condition"
import { Context } from "src/domain/context/context"

export class Gpt54Model implements GenerativeModel {
	private readonly client: OpenAI

	constructor(private readonly condition: Condition<Context> | undefined) {
		this.client = new OpenAI()
	}

	async stream(request: unknown): Promise<unknown> {
		const params = request as any
		params.model = "gpt-5.4"
		params.stream = true
		params.reasoning = {
			effort: "none",
		}
		const response: any = await this.client.responses.create(params)

		for await (const event of response) {
			console.log(event)
		}
		return response
	}
	async call(request: unknown): Promise<unknown> {
		// if (this.condition && !this.condition.isSatisfiedBy(request)) {
		// 	throw new Error("Policy not satisfied.")
		// }
		const params = request as any
		params.model = "gpt-5.4"
		params.reasoning = {
			effort: "medium",
		}

		const response = await this.client.responses.create(params)

		this.extractTokenUsage(response)
		return response
	}

	extractTokenUsage(response: any): Usage {
		console.log(response)
		const usage: Usage = {
			inputTokens: 0,
			outputTokens: 0,
			reasoningTokens: 0,
			cachedTokens: 0,
			cost: 0,
		}
		return usage
	}
}
