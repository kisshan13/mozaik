import { RequestBuilder } from "./request-builder"
import { CapabilityHandler } from "../command-handler/capability"
import { MessagesHandler } from "../command-handler/messages"
import { TaskHandler } from "../command-handler/task"
import { ModelHandler } from "../command-handler/model"
import { StructuredOutputlHandler } from "../command-handler/structured-output"
import { Command } from "@/types/command"
import { ToolsHandler } from "../command-handler/tools"

export abstract class Endpoint {
	abstract requestBuilder: RequestBuilder
	command: Command | null = null

	buildRequest(command: Command): any {
		this.command = command

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

		messagesHandler.handle(command, this.requestBuilder)

		return this.requestBuilder.build()
	}

	abstract sendRequest(providerRequest: any): any
}
