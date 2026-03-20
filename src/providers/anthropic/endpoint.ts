import { Endpoint } from "@core/endpoint/endpoint"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import { AnthropicClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { ParsedOutputHandler } from "./response-handler/parsed-output"
import { ContentHandler } from "./response-handler/content"
import { ToolUseHandler } from "./response-handler/tool-use"
import { MozaikRequest } from "@/types/inference-specification"
import { MozaikResponse } from "@core/response"
import { UsageHandler } from "./response-handler/usage"
import { UnhandledResponseHandler } from "./response-handler/undhandled"

export class AnthropicEndpoint extends Endpoint {
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

	async sendRequest(mozaikRequest: MozaikRequest): Promise<any> {
		const providerRequest = this.buildRequest(mozaikRequest)
		const client = AnthropicClientResolver.resolve(providerRequest)
		const response = await client.send(providerRequest)

		const mozaikResponse = new MozaikResponse()
		mozaikResponse.setProviderResponse(response)

		// response handler (chain of responsibilities)
		const usageHandler: ResponseHandler = new UsageHandler()
		const toolUseHandler: ResponseHandler = new ToolUseHandler(
			providerRequest,
			mozaikRequest.tools ? mozaikRequest.tools : [],
		)
		const parsedOutputHandler: ResponseHandler = new ParsedOutputHandler()
		const contentHandler: ResponseHandler = new ContentHandler()
		const unhandledResponseHandler: ResponseHandler = new UnhandledResponseHandler()

		usageHandler
			.setNextHandler(toolUseHandler)
			.setNextHandler(parsedOutputHandler)
			.setNextHandler(contentHandler)
			.setNextHandler(unhandledResponseHandler)

		const responseHandler = usageHandler

		const result = await responseHandler.handle(mozaikResponse)

		return result.getResponse()
	}
}
