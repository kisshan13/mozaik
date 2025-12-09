import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesBuilder } from "./builder"
import { OpenAIClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/response-handler"
import { OutputParsedHandler } from "./response-handler/output-parsed"
import { ContentHandler } from "./response-handler/content"
import { OutputTextHandler } from "./response-handler/output-text"
import { EmptyResponseHandler } from "./response-handler/empty"
import { FunctionCallsHandler } from "./response-handler/function-calls"

export class OpenAIResponses extends Endpoint {
    requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

    responseHandler: ResponseHandler

	constructor(){
		super()

        const functionCallsHandler: ResponseHandler = new FunctionCallsHandler()
		const outputParsedHandler: ResponseHandler = new OutputParsedHandler()
        const outputTextHandler: ResponseHandler = new OutputTextHandler()
		const contentHandler: ResponseHandler = new ContentHandler()
        const emptyResponseHandler: ResponseHandler = new EmptyResponseHandler()

        functionCallsHandler
            .setNextHandler(outputParsedHandler)
            .setNextHandler(outputTextHandler)
            .setNextHandler(contentHandler)
            .setNextHandler(emptyResponseHandler)

		this.responseHandler = functionCallsHandler
	}

    async sendRequest(request: any) {
        
        try {

            const client = OpenAIClientResolver.resolve(request)
            const response = await client.send(request)
            return this.responseHandler.handle(request, response)
        } catch (error) {
            console.warn('[OpenAIProvider] Responses API request failed:', error)
            throw error
        }
    }

    
}