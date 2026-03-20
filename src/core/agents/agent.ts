import { RequestGateway } from "@core/endpoint/request-gateway"
import { MozaikRequest } from "@/types/inference-specification"
import { DefaultEndpointResolver } from "@providers/endpoint-resolver"
import { ZodObject } from "zod"
import { Model } from "@/types/model"
import { Message } from "@/types/message"

export class MozaikAgent {
	private request: MozaikRequest
	gateway: RequestGateway = new RequestGateway(new DefaultEndpointResolver())

	constructor(request: MozaikRequest) {
		this.request = request
	}

	setModel(model: Model) {
		this.request.model = model
	}

	setMessages(messages: Message[]) {
		this.request.messages = messages
	}

	setTask(task: string) {
		this.request.task = task
	}

	setStructuredOutput(schema: ZodObject<any>) {
		this.request.structuredOutput = schema
	}

	async act(task?: string) {
		if (task) {
			this.request.task = task
		}
		return await this.gateway.invoke(this.request)
	}
}
