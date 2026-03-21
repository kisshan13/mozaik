import { RequestGateway } from "@/app/core/endpoint/request-gateway"
import { InferenceRequest } from "@/domain/inference/inference-request"
import { DefaultEndpointResolver } from "@/infra/endpoint-resolver"
import { ZodObject } from "zod"
import { Model } from "@/domain/types/model"
import { Message } from "@/domain/types/message"

export class MozaikAgent {
	private inferenceRequest: InferenceRequest
	gateway: RequestGateway = new RequestGateway(new DefaultEndpointResolver())

	constructor(inferenceRequest: InferenceRequest) {
		this.inferenceRequest = inferenceRequest
	}

	setModel(model: Model) {
		this.inferenceRequest.model = model
	}

	setMessages(messages: Message[]) {
		this.inferenceRequest.messages = messages
	}

	setTask(task: string) {
		this.inferenceRequest.task = task
	}

	setStructuredOutput(schema: ZodObject<any>) {
		this.inferenceRequest.structuredOutput = schema
	}

	async act(task?: string) {
		if (task) {
			this.inferenceRequest.task = task
		}
		return await this.gateway.invoke(this.inferenceRequest)
	}
}
