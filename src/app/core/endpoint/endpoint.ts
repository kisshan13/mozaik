import { RequestBuilder } from "./request-builder"
import { CapabilityHandler } from "../request-handler/capability"
import { MessagesHandler } from "../request-handler/messages"
import { TaskHandler } from "../request-handler/task"
import { ModelHandler } from "../request-handler/model"
import { StructuredOutputlHandler } from "../request-handler/structured-output"
import { InferenceSpecification } from "@/domain/types/inference-specification"
import { ToolsHandler } from "../request-handler/tools"

export abstract class Endpoint {
	abstract requestBuilder: RequestBuilder
	inferenceSpecification: InferenceSpecification | null = null

	buildRequest(inferenceSpecification: InferenceSpecification): any {
		this.inferenceSpecification = inferenceSpecification

		this.requestBuilder.initialize()

		const messagesHandler: CapabilityHandler = new MessagesHandler()
		const taskHandler: CapabilityHandler = new TaskHandler()
		const modelHandler: CapabilityHandler = new ModelHandler()
		const structuredOutputHandler: CapabilityHandler = new StructuredOutputlHandler()
		const toolsHandler: CapabilityHandler = new ToolsHandler()

		messagesHandler
			.setNextHandler(taskHandler)
			.setNextHandler(modelHandler)
			.setNextHandler(structuredOutputHandler)
			.setNextHandler(toolsHandler)

		messagesHandler.handle(inferenceSpecification, this.requestBuilder)

		return this.requestBuilder.build()
	}

	abstract sendRequest(inferenceSpecification: InferenceSpecification): any
}
