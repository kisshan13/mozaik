import { Message } from "@/types/message"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { OpenAIResponsesMapper } from "./mapper"
import { zodTextFormat } from "openai/helpers/zod"
import { ZodObject } from "zod"
import { Tool } from "@/types/tool"
import { ReasoningEffort } from "@/types/request"

export class OpenAIResponsesBuilder extends RequestBuilder {

	constructor(private mapper = new OpenAIResponsesMapper()) {
		super()
	}

	addModel(model: string): RequestBuilder {
		this.request.model = model
		return this
	}

	addTask(task: string): RequestBuilder {
		this.request.input = task
		return this
	}

	addMessages(messages: Message[]): RequestBuilder {
		const instructions = this.mapper.toInstructions(messages)
		// Set optional instructions if there's a system message
		if (instructions && instructions !== "You are a helpful assistant.") {
			this.request.instructions = instructions
		}

		return this
	}

	addStructuredOutput(schema: ZodObject): RequestBuilder {
		this.request.text = {
			format: zodTextFormat(schema, "outputSchema"),
		}
		return this
	}
	
	addTools(tools: Tool[]): RequestBuilder {
		this.request.tools = tools.map((tool) => ({
			type: "function" as const,
			name: tool.name,
			description: tool.description,
			parameters: tool.schema,
		}))
		return this
	}

	addReasoningEffort(effort: ReasoningEffort): RequestBuilder {
		let reasoningEffort = ''
		if (effort === ReasoningEffort.NONE) {
			reasoningEffort = 'none'
		} else if (effort === ReasoningEffort.LOW) {
			reasoningEffort = "low"
		} else if (effort === ReasoningEffort.MEDIUM) {
			reasoningEffort = "medium"
		} else if (effort === ReasoningEffort.HIGH) {
			reasoningEffort = "high"
		} else if (effort === ReasoningEffort.MAX) {
			reasoningEffort = "xhigh"
		}

		this.request.reasoning = {
			effort: reasoningEffort
		}

		return this
	}
}
