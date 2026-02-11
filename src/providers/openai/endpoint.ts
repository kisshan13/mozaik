import { Endpoint } from "@core/endpoint/endpoint"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { OpenAIResponsesBuilder } from "./builder"
import { OpenAIClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { OutputParsedHandler } from "./response-handler/output-parsed"
import { ContentHandler } from "./response-handler/content"
import { OutputTextHandler } from "./response-handler/output-text"
import { FunctionCallsHandler } from "./response-handler/function-calls"
import { Command } from "@/types/command"
import { ResponseContext } from "@core/endpoint/response-context"
import { UsageHandler } from "./response-handler/usage"

export class OpenAIResponses extends Endpoint {
	requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

	constructor() {
		super()
	}

	async sendRequest(command: Command) {
		try {
			const request = this.buildRequest(command)
			const client = OpenAIClientResolver.resolve(request)
			const response = await client.send(request)

			const responseContext = new ResponseContext()
			responseContext.setProviderResponse(response)

			// response handler (chain of responsibilities)
			const usageHandler: ResponseHandler = new UsageHandler()
			const functionCallsHandler: ResponseHandler = new FunctionCallsHandler(
				request,
				command.tools ? command.tools : [],
			)
			const outputParsedHandler: ResponseHandler = new OutputParsedHandler()
			const outputTextHandler: ResponseHandler = new OutputTextHandler()
			const contentHandler: ResponseHandler = new ContentHandler()

			usageHandler
				.setNextHandler(functionCallsHandler)
				.setNextHandler(outputParsedHandler)
				.setNextHandler(outputTextHandler)
				.setNextHandler(contentHandler)

			const responseHandler = usageHandler

			return await responseHandler.handle(responseContext)
		} catch (error) {
			console.warn("[OpenAIProvider] Responses API request failed:", error)
			throw error
		}
	}
}
