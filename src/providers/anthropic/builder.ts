import { Message } from "@/types/message"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { AnthropicMapper } from "./mapper"
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod"
import { ANTHROPIC_MODEL_MAP, AnthropicModel } from "@/types/model"
import { ZodObject } from "zod"
import { Tool } from "@/types/tool"

export class AnthropicRequestBuilder extends RequestBuilder {
	private mapper = new AnthropicMapper()

	addModel(model: AnthropicModel): RequestBuilder {
		this.request.model = ANTHROPIC_MODEL_MAP[model]
		return this
	}

	addTask(task: string): RequestBuilder {
		// Add task as a user message
		const message = {
			role: "user" as const,
			content: task,
		}

		if (!this.request.messages) {
			this.request.messages = []
		}

		this.request.messages.push(message)
		return this
	}

	addMessages(messages: Message[]): RequestBuilder {
		const { messages: anthropicMessages, system } = this.mapper.toMessages(messages)

		this.request.messages = anthropicMessages

		if (system) {
			this.request.system = system
		}

		return this
	}

	addStructuredOutput(schema: ZodObject): RequestBuilder {
		this.request.betas = ["structured-outputs-2025-11-13"]
		this.request.output_format = betaZodOutputFormat(schema)
		return this
	}

	addTools(tools: Tool[]): RequestBuilder {
		this.request.tools = tools.map((tool) => ({
			name: tool.name,
			description: tool.description,
			input_schema: tool.schema,
		}))
		return this
	}

	build() {
		// Anthropic requires max_tokens parameter
		if (!this.request.max_tokens) {
			this.request.max_tokens = 1024
		}

		return this.request
	}
}
