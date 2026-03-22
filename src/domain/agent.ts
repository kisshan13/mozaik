import { RequestGateway } from "@/app/core/endpoint/request-gateway"
import { Context } from "@/domain/inference/context"
import { DefaultEndpointResolver } from "@/infra/endpoint-resolver"
import { ZodObject } from "zod"
import { Model } from "@/domain/types/model"
import { Message } from "@/domain/types/message"

export class MozaikAgent {
	private context: Context
	gateway: RequestGateway = new RequestGateway(new DefaultEndpointResolver())

	constructor(context: Context) {
		this.context = context
	}

	setModel(model: Model) {
		this.context.model = model
	}

	setMessages(messages: Message[]) {
		this.context.messages = messages
	}

	setTask(task: string) {
		this.context.task = task
	}

	setStructuredOutput(schema: ZodObject<any>) {
		this.context.structuredOutput = schema
	}

	async act(task?: string) {
		if (task) {
			this.context.task = task
		}
		return await this.gateway.invoke(this.context)
	}
}
