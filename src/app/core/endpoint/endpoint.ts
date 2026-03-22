import { RequestBuilder } from "./request-builder"
import { CapabilityHandler } from "../../../domain/request-handler/capability"
import { MessagesHandler } from "../../../domain/request-handler/messages"
import { TaskHandler } from "../../../domain/request-handler/task"
import { ModelHandler } from "../../../domain/request-handler/model"
import { StructuredOutputlHandler } from "../../../domain/request-handler/structured-output"
import { Context } from "@/domain/inference/context"
import { ToolsHandler } from "../../../domain/request-handler/tools"

export abstract class Endpoint {
	abstract requestBuilder: RequestBuilder
	context: Context | null = null

	buildRequest(context: Context): any {
		this.context = context

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

		messagesHandler.handle(context, this.requestBuilder)

		return this.requestBuilder.build()
	}

	abstract sendRequest(context: Context): any
}
