import { Context } from "@core/context-runtime/context"
import { ContextItem } from "@core/context-runtime/context-item"
import { FunctionCall } from "@core/context-runtime/output/function-call"
import { ModelMessage } from "@core/context-runtime/output/model-message"
import { Reasoning } from "@core/context-runtime/output/reasoning"
import { ModelRuntime } from "@core/generative-model/runtime/model-runtime"
import { GPT54 } from "@openai/models/gpt-5-4"
import OpenAI from "openai"

export class OpenAIResponses implements ModelRuntime<"gpt-5.4"> {
	private readonly client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	async infer(model: GPT54, context: Context): Promise<ContextItem[]> {
		const request = this.mapContextToRequest(context)
		const response = await this.client.responses.create({
			model: model.id,
			input: request,
		})
		return this.extractContextItems(response)
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
