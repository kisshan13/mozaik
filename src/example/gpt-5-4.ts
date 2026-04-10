import { GenerativeModel, Usage } from "@generative-model/generative-model"
import OpenAI from "openai"
import { Policy } from "src/domain/policy"

export class Gpt54Model implements GenerativeModel {
	private readonly client: OpenAI

	constructor(private readonly policy: Policy | undefined) {
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
		if (this.policy && !this.policy.isSatisfiedBy(request)) {
			throw new Error("Policy not satisfied.")
		}
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
