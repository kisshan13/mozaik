import { Context } from "src/domain/context-runtime/context"
import { ContextItem } from "src/domain/context-runtime/context-item"
import { InferenceGateway } from "src/domain/inference-gateway"
import { UserMessage } from "src/domain/context-runtime/input/user-message"
import { DeveloperMessage } from "src/domain/context-runtime/input/developer-message"
import { ModelMessage } from "src/domain/context-runtime/output/model-message"
import OpenAI from "openai"
import "dotenv/config"
import { FunctionCallOutput } from "src/domain/context-runtime/input/function-call-output"
import { FunctionCall } from "src/domain/context-runtime/output/function-call"
import { Reasoning } from "src/domain/context-runtime/output/reasoning"

export class GPT54InferenceGateway implements InferenceGateway {
	private readonly client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	private mapInputToJSON(context: Context): any[] {
		return context.getItems().map((item) => item.toJSON())
	}

	private extractContextItems(response: any): ContextItem[] {
		return response.output.map((item: any) => {
			if (item.type === "message" && item.status === "completed") {
				return ModelMessage.rehydrate(item.content[0] as { text: string })
			}
			if (item.type === "function_call" && item.status === "completed") {
				return FunctionCall.rehydrate(item)
			}
			if (item.type === "reasoning" && item.status === "completed") {
				return Reasoning.rehydrate(item)
			}
		})
	}

	async infer(context: Context): Promise<ContextItem[]> {
		const inputJSON = this.mapInputToJSON(context)
		const response = await this.client.responses.create({
			model: "gpt-5.4",
			input: inputJSON,
		})
		return this.extractContextItems(response)
	}
}

async function main() {
	const message = UserMessage.create("Tell me a joke about birds")
	const developerMessage = DeveloperMessage.create(
		"You are a joke teller. You will be given a joke and you will need to tell it to the user.",
	)

	const context = Context.create().addItem(developerMessage).addItem(message)
	const inferenceGateway = new GPT54InferenceGateway()
	const newContextItems = await inferenceGateway.infer(context)
	context.addItems(newContextItems)
	console.log(context)
}

main().catch((error) => {
	console.error(error)
})
