import { Context } from "@core/context-runtime/context"
import { ContextItem } from "@core/context-runtime/context-item"
import { FunctionCall } from "@core/context-runtime/output/function-call"
import { ModelMessage } from "@core/context-runtime/output/model-message"
import { Reasoning } from "@core/context-runtime/output/reasoning"
import { InferenceRequest } from "@core/generative-model/inference-request"
import { ModelRuntime } from "@core/generative-model/runtime/model-runtime"
import { reasoningEffortRule } from "@openai/rules/reasoning-effort"
import OpenAI from "openai"

export class OpenAIResponses implements ModelRuntime {
	private readonly client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	async infer(inferenceRequest: InferenceRequest): Promise<ContextItem[]> {
		const input = this.mapContextToRequest(inferenceRequest.context)

		reasoningEffortRule.apply(inferenceRequest)

		const response = await this.client.responses.create({
			model: inferenceRequest.model.id,
			input: input,
			...inferenceRequest.providerRequest,
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
			if (item.type === "reasoning") {
				return Reasoning.rehydrate(item)
			}
		})
	}
}
