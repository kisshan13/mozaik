import { Context } from "@domain/model-context/model-context"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { Reasoning } from "@domain/model-context/context-item/model-item/reasoning"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { ModelRuntime } from "@domain/generative-model/runtime/model-runtime"
import { InputTokenDetails, OutputTokenDetails, TokenUsage } from "@domain/generative-model/token-usage"
import OpenAI from "openai"

export class OpenAIResponses implements ModelRuntime {
	private readonly client: OpenAI
	constructor() {
		this.client = new OpenAI()
	}

	async infer(inferenceRequest: InferenceRequest): Promise<InferenceResponse> {
		const input = this.mapContextToRequest(inferenceRequest.context)

		const specification = inferenceRequest.model.specification

		let request: any = {
			model: specification.name,
			input: input,
		}

		if (specification.supportFunctionCalling && inferenceRequest.model.getTools().length > 0) {
			request.tools = inferenceRequest.model.getTools().map((tool) => {
				return {
					type: tool.type,
					name: tool.name,
					description: tool.description,
					parameters: tool.parameters,
				}
			})
		}

		if (specification.supportReasoningEffort) {
			request.reasoning = {
				effort: inferenceRequest.model.getReasoningEffort(),
			}
		}

		const response = await this.client.responses.create(request)

		const contextItems = this.extractContextItems(response)
		const tokenUsage = this.extractTokenUsage(response)
		return new InferenceResponse(contextItems, tokenUsage)
	}

	extractTokenUsage(response: OpenAI.Responses.Response): TokenUsage | undefined {
		if (!response.usage) {
			return undefined
		}
		return new TokenUsage(
			response.usage.input_tokens,
			response.usage.output_tokens,
			response.usage.total_tokens,
			new InputTokenDetails(response.usage.input_tokens_details.cached_tokens),
			new OutputTokenDetails(response.usage.output_tokens_details.reasoning_tokens),
		)
	}

	mapContextToRequest(context: Context): any[] {
		return context.getItems().map((item) => item.toJSON())
	}

	extractContextItems(response: any): ContextItem[] {
		return response.output.map((item: any) => {
			if (item.type === "message" && item.role === "assistant") {
				return ModelMessage.rehydrate(item.content[0] as { text: string })
			}
			if (item.type === "function_call") {
				return FunctionCall.rehydrate({
					callId: item.call_id,
					name: item.name,
					args: item.arguments,
				})
			}
			if (item.type === "reasoning") {
				return Reasoning.rehydrate(item)
			}
		})
	}
}
