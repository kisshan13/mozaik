import { Endpoint } from "@core/endpoint/endpoint"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import { AnthropicClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { ParsedOutputHandler } from "./response-handler/parsed-output"
import { ContentHandler } from "./response-handler/content"
import { ToolUseHandler } from "./response-handler/tool-use"
import { Command } from "@/types/command"
import { ResponseContext } from "@core/endpoint/response-context"

export class AnthropicEndpoint extends Endpoint {
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

	async sendRequest(command: Command) {
		const request = this.buildRequest(command)
		const client = AnthropicClientResolver.resolve(request)
		const response = await client.send(request)

		const responseContext = new ResponseContext()
		responseContext.setProviderResponse(response)

		// response handler (chain of responsibilities)
		const toolUseHandler: ResponseHandler = new ToolUseHandler(request, command.tools ? command.tools : [])
		const parsedOutputHandler: ResponseHandler = new ParsedOutputHandler()
		const contentHandler: ResponseHandler = new ContentHandler()

		toolUseHandler.setNextHandler(parsedOutputHandler).setNextHandler(contentHandler)

		const responseHandler = toolUseHandler

		return responseHandler.handle(response)
	}
}
