import { Message } from "@/types/message"
import { Tool } from "@/types/tool"
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

	build() {
		return this.request
	}
}
