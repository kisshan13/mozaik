import { InferenceRunner } from "@domain/agentic-environment/runners/inference-runner"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { InputTokenDetails, OutputTokenDetails, TokenUsage } from "@domain/generative-model/token-usage"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelContext } from "@domain/model-context/model-context"
import OpenAI from "openai"

type InferenceItem = ReasoningItem | FunctionCallItem | ModelMessageItem

export class OpenAIInferenceRunner implements InferenceRunner {
	async *run(context: ModelContext, model: GenerativeModel, signal?: AbortSignal): AsyncIterable<InferenceItem> {
		const input = this.mapContextToRequest(context)

		const specification = model.specification

		let request: any = {
			model: specification.name,
			input: input,
			stream: model.getStreaming(),
		}

		if (specification.supportFunctionCalling && model.getTools().length > 0) {
			request.tools = model.getTools().map((tool) => {
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
				effort: model.getReasoningEffort(),
			}
		}

		if (!specification.supportStreaming && model.getStreaming()) {
			throw new Error("Streaming is not supported for this model")
		}

		const openai = new OpenAI()

		const response: any = await openai.responses.create(request)

		if (specification.supportStreaming && model.getStreaming()) {
			for await (const event of response) {
				if (signal?.aborted) {
					break
				}
				yield event as unknown as InferenceItem
			}
		} else {
			const contextItems = this.extractContextItems(response)
			const tokenUsage = this.extractTokenUsage(response)

			for (const item of contextItems) {
				if (signal?.aborted) {
					break
				}
				yield item as InferenceItem
			}
		}
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

	mapContextToRequest(context: ModelContext): any[] {
		return context.getItems().map((item) => item.toJSON())
	}

	extractContextItems(response: any): ContextItem[] {
		return response.output.map((item: any) => {
			if (item.type === "message" && item.role === "assistant") {
				return ModelMessageItem.rehydrate(item.content[0] as { text: string })
			}
			if (item.type === "function_call") {
				return FunctionCallItem.rehydrate({
					callId: item.call_id,
					name: item.name,
					args: item.arguments,
				})
			}
			if (item.type === "reasoning") {
				return ReasoningItem.rehydrate(item)
			}
		})
	}
}
