import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import { AnthropicClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/response-handler"
import { ParsedOutputHandler } from "./response-handler/parsed-output"
import { ContentHandler } from "./response-handler/content"

export class AnthropicEndpoint extends Endpoint {
	
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()
	responseHandler: ResponseHandler

	constructor(){
		super()

		const parsedOutputHandler: ResponseHandler = new ParsedOutputHandler()
		const contentHandler: ResponseHandler = new ContentHandler()

        parsedOutputHandler
            .setNextHandler(contentHandler)

		this.responseHandler = parsedOutputHandler
	}

	async sendRequest(request: any) {

		const client = AnthropicClientResolver.resolve(request)
		const response = await client.send(request)
		return this.responseHandler.handle(request, response)
	}
}
