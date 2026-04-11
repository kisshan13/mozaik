import { Context } from "src/domain/context-runtime/context"
import { ContextItem } from "src/domain/context-runtime/context-item"
import { InferenceGateway } from "src/domain/inference-gateway"
import OpenAI from "openai"
import { UserMessage } from "src/domain/context-runtime/input/user-message"
import { InputTextContent } from "src/domain/context-runtime/content/input-text"
export class GPT54InferenceGateway implements InferenceGateway {
	private readonly client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	async infer(context: Context): Promise<ContextItem[]> {
		const input = context.getItems()
		const inputJSON = input.map((item) => item.toJSON())
		const response = await this.client.responses.create({
			model: "gpt-5.4",
			input: inputJSON,
		})
		console.log(response)
		return Promise.resolve([])
	}
}

import "dotenv/config"

async function main() {
	const context = new Context([new UserMessage(InputTextContent.create("Tell me a joke!"))])
	const inferenceGateway = new GPT54InferenceGateway()
	const output = await inferenceGateway.infer(context)
	console.log(output)
}

main().catch((error) => {
	console.error(error)
})
