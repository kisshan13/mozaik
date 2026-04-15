import { Context } from "@core/context-runtime/context"
import { ContextItem } from "@core/context-runtime/context-item"
import { FunctionCall } from "@core/context-runtime/output/function-call"
import { ModelMessage } from "@core/context-runtime/output/model-message"
import { Reasoning } from "@core/context-runtime/output/reasoning"
import { InferenceRequest } from "@core/generative-model/inference-request"
import { ModelRuntime } from "@core/generative-model/runtime/model-runtime"
import OpenAI from "openai"

export class OpenAIResponses implements ModelRuntime {
	private readonly client: OpenAI
	constructor() {
		this.client = new OpenAI()
	}

	async infer(inferenceRequest: InferenceRequest): Promise<ContextItem[]> {
		const input = this.mapContextToRequest(inferenceRequest.context)

		const specification = inferenceRequest.model.specification
		let request: any = {
			model: specification.name,
			input: input,
		}

		if (specification.supportReasoningEffort) {
			request.reasoning = {
				effort: inferenceRequest.model.getReasoningEffort(),
			}
		}

		const response = await this.client.responses.create(request)

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
