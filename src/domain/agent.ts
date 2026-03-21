import { RequestGateway } from "@/app/core/endpoint/request-gateway"
import { InferenceSpecification } from "@/domain/types/inference-specification"
import { DefaultEndpointResolver } from "@/infra/endpoint-resolver"
import { ZodObject } from "zod"
import { Model } from "@/domain/types/model"
import { Message } from "@/domain/types/message"

export class MozaikAgent {
	private inferenceSpecification: InferenceSpecification
	gateway: RequestGateway = new RequestGateway(new DefaultEndpointResolver())

	constructor(inferenceSpecification: InferenceSpecification) {
		this.inferenceSpecification = inferenceSpecification
	}

	setModel(model: Model) {
		this.inferenceSpecification.model = model
	}

	setMessages(messages: Message[]) {
		this.inferenceSpecification.messages = messages
	}

	setTask(task: string) {
		this.inferenceSpecification.task = task
	}

	setStructuredOutput(schema: ZodObject<any>) {
		this.inferenceSpecification.structuredOutput = schema
	}

	async act(task?: string) {
		if (task) {
			this.inferenceSpecification.task = task
		}
		return await this.gateway.invoke(this.inferenceSpecification)
	}
}
