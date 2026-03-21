import { Message } from "@/domain/types/message"
import { ReasoningEffort } from "@/domain/types/inference-specification"
import { Tool } from "@/domain/types/tool"
import { ZodObject } from "zod"

export abstract class RequestBuilder {
	request: any

	initialize() {
		this.request = {}
	}

	abstract addModel(model: string): RequestBuilder
	abstract addTask(task: string): RequestBuilder
	abstract addMessages(messages: Message[]): RequestBuilder
	abstract addStructuredOutput(schema: ZodObject<any>): RequestBuilder
	abstract addTools(tools: Tool[]): RequestBuilder
	abstract addReasoningEffort(effort: ReasoningEffort): RequestBuilder

	build() {
		return this.request
	}
}
