import { ModelContext } from "@domain/model-context/model-context"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { InputText } from "@domain/model-context/context-item/item-content/input-text"
import { DeveloperMessageItem } from "@domain/model-context/context-item/client-item/developer-message"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { ModelRuntime } from "@domain/generative-model/runtime/model-runtime"
import { StreamingRuntime } from "@domain/generative-model/runtime/streaming-runtime"
import { SemanticEvent } from "@domain/model-context/semantic-event/semantic-event"
import { InputTokenDetails, OutputTokenDetails, TokenUsage } from "@domain/generative-model/token-usage"
import OpenAI from "openai"

const DEEPSEEK_BASE_URL = "https://api.deepseek.com"

/**
 * DeepSeek V4 adapter. DeepSeek is OpenAI **Chat Completions** compatible
 * (not the Responses API), so this reuses the `openai` SDK pointed at
 * DeepSeek's base URL and the `DEEPSEEK_API_KEY` credential. Thinking
 * mode is toggled with the `thinking` body field; chain-of-thought is
 * returned in `reasoning_content` alongside `content`.
 */
export class DeepSeekChatCompletions implements ModelRuntime, StreamingRuntime {
	private readonly client: OpenAI

	constructor() {
		this.client = new OpenAI({
			baseURL: DEEPSEEK_BASE_URL,
			apiKey: process.env.DEEPSEEK_API_KEY,
		})
	}

	async infer(inferenceRequest: InferenceRequest): Promise<InferenceResponse> {
		const response = await this.client.chat.completions.create(this.buildRequest(inferenceRequest))

		const contextItems = this.extractContextItems(response)
		const tokenUsage = this.extractTokenUsage(response)
		return new InferenceResponse(contextItems, tokenUsage)
	}

	async *stream(
		inferenceRequest: InferenceRequest,
		signal?: AbortSignal,
	): AsyncIterable<ReasoningItem | FunctionCallItem | ModelMessageItem | SemanticEvent<unknown>> {
		const stream: any = await this.client.chat.completions.create({
			...this.buildRequest(inferenceRequest),
			stream: true,
		})

		for await (const event of stream) {
			if (signal?.aborted) {
				break
			}
			yield new SemanticEvent(event.object ?? "chat.completion.chunk", event)
		}
	}

	private buildRequest(inferenceRequest: InferenceRequest): any {
		const specification = inferenceRequest.model.specification

		const request: any = {
			model: specification.name,
			messages: this.mapContextToRequest(inferenceRequest.context),
		}

		if (specification.supportFunctionCalling && inferenceRequest.model.getTools().length > 0) {
			request.tools = inferenceRequest.model.getTools().map((tool) => {
				return {
					type: "function",
					function: {
						name: tool.name,
						description: tool.description,
						parameters: tool.parameters,
					},
				}
			})
		}

		if (specification.supportReasoningEffort) {
			const effort = inferenceRequest.model.getReasoningEffort()
			if (effort === "none") {
				request.thinking = { type: "disabled" }
			} else {
				request.thinking = { type: "enabled" }
				request.reasoning_effort = effort
			}
		}

		return request
	}

	extractTokenUsage(response: any): TokenUsage | undefined {
		if (!response.usage) {
			return undefined
		}
		return new TokenUsage(
			response.usage.prompt_tokens,
			response.usage.completion_tokens,
			response.usage.total_tokens,
			new InputTokenDetails(response.usage.prompt_tokens_details?.cached_tokens ?? 0),
			new OutputTokenDetails(response.usage.completion_tokens_details?.reasoning_tokens ?? 0),
		)
	}

	mapContextToRequest(context: ModelContext): any[] {
		const messages: any[] = []

		for (const item of context.getItems()) {
			if (item instanceof DeveloperMessageItem || item instanceof SystemMessageItem) {
				messages.push({ role: "system", content: item.content.text })
				continue
			}

			if (item instanceof UserMessageItem) {
				messages.push({ role: "user", content: item.content.text })
				continue
			}

			if (item instanceof ModelMessageItem) {
				messages.push({ role: "assistant", content: item.content.text })
				continue
			}

			if (item instanceof FunctionCallItem) {
				const toolCall = {
					id: item.callId,
					type: "function",
					function: { name: item.name, arguments: item.args },
				}
				const last = messages[messages.length - 1]
				if (last?.role === "assistant") {
					last.tool_calls = last.tool_calls ?? []
					last.tool_calls.push(toolCall)
				} else {
					messages.push({ role: "assistant", content: null, tool_calls: [toolCall] })
				}
				continue
			}

			if (item instanceof FunctionCallOutputItem) {
				messages.push({ role: "tool", tool_call_id: item.callId, content: item.output.text })
			}
		}

		return messages
	}

	extractContextItems(response: any): ContextItem[] {
		const items: ContextItem[] = []
		const message = response.choices?.[0]?.message
		if (!message) {
			return items
		}

		if (message.reasoning_content) {
			items.push(
				ReasoningItem.rehydrate({
					content: InputText.rehydrate({ text: message.reasoning_content }),
					encryptedContent: undefined,
					summary: [],
				}),
			)
		}

		if (message.content) {
			items.push(ModelMessageItem.rehydrate({ text: message.content }))
		}

		for (const toolCall of message.tool_calls ?? []) {
			items.push(
				FunctionCallItem.rehydrate({
					callId: toolCall.id,
					name: toolCall.function.name,
					args: toolCall.function.arguments,
				}),
			)
		}

		return items
	}
}
