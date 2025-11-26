import { Message } from "@/types/message"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesMapper } from "./responses-mapper"
import { zodTextFormat } from "openai/helpers/zod"
import z from "zod"

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

	addStructuredOutput(schema: z.ZodObject): RequestBuilder {

		this.request.text = {
			format: zodTextFormat(schema, "outputSchema"),
		}
		return this
	}
}
