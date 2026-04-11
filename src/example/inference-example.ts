import { Context } from "src/domain/context-runtime/context"
import { ContextItem } from "src/domain/context-runtime/context-item"
import { InferenceGateway } from "src/domain/inference-gateway"
import { UserMessage } from "src/domain/context-runtime/input/user-message"
import { DeveloperMessage } from "src/domain/context-runtime/input/developer-message"
import { ModelMessage } from "src/domain/context-runtime/output/model-message"
import OpenAI from "openai"
import "dotenv/config"

export class GPT54InferenceGateway implements InferenceGateway {
	private readonly client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	async infer(context: Context): Promise<(ContextItem | null)[]> {
		const input = context.getItems()
		const inputJSON = input.map((item) => item.toJSON())
		const response = await this.client.responses.create({
			model: "gpt-5.4",
			input: inputJSON,
		})
		const output: (ContextItem | null)[] = response.output.map((item) =>
			item.type === "message" && item.status === "completed"
				? ModelMessage.rehydrate(item.content[0] as { text: string })
				: null,
		)
		return output
	}
}

async function main() {
	const message = UserMessage.create("Tell me a joke about birds")
	const developerMessage = DeveloperMessage.create(
		"You are a joke teller. You will be given a joke and you will need to tell it to the user.",
	)

	const context = Context.create().addItem(developerMessage).addItem(message)
	const inferenceGateway = new GPT54InferenceGateway()
	const output = await inferenceGateway.infer(context)
	console.log(output)
}

main().catch((error) => {
	console.error(error)
})
