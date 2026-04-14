import { Context } from "src/domain/context-runtime/context"
import { ContextItem } from "src/domain/context-runtime/context-item"
import { UserMessage } from "src/domain/context-runtime/input/user-message"
import { DeveloperMessage } from "src/domain/context-runtime/input/developer-message"
import { ModelMessage } from "src/domain/context-runtime/output/model-message"
import { FunctionCall } from "src/domain/context-runtime/output/function-call"
import { Reasoning } from "src/domain/context-runtime/output/reasoning"
import { GenerativeModel } from "src/domain/generative-model/generative-model"
import OpenAI from "openai"
import "dotenv/config"
import { InMemoryContextRepository } from "./in-memory-context-repository"

export class GPT54Model extends GenerativeModel {
	private readonly client: OpenAI

	constructor() {
		super()
		this.client = new OpenAI()
	}

	infer(request: any): Promise<any> {
		return this.client.responses.create({
			model: "gpt-5.4",
			input: request,
		})
	}

	mapContextToRequest(context: Context): any[] {
		return context.getItems().map((item) => item.toJSON())
	}

	extractContextItems(response: any): ContextItem[] {
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
}

async function main() {
	const message = UserMessage.create("Tell me a joke about birds")
	const developerMessage = DeveloperMessage.create(
		"You are a joke teller. You will be given a joke and you will need to tell it to the user.",
	)

	const projectId = `pr-${crypto.randomUUID()}`
	const contextRepository = new InMemoryContextRepository()
	const context = Context.create(projectId).addItem(developerMessage).addItem(message)

	await contextRepository.save(context)

	const model = new GPT54Model()
	const newContextItems = await model.call(context)
	context.addItems(newContextItems)

	await contextRepository.save(context)
	const restoredContexts = await contextRepository.getByProjectId(projectId)
	console.log(restoredContexts)
}

main().catch((error) => {
	console.error(error)
})
