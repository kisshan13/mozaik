import { Endpoint } from "@core/endpoint/endpoint"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { OpenAIResponsesBuilder } from "./builder"
import { OpenAIClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { OutputParsedHandler } from "./response-handler/output-parsed"
import { ContentHandler } from "./response-handler/content"
import { OutputTextHandler } from "./response-handler/output-text"
import { EmptyResponseHandler } from "./response-handler/empty"
import { FunctionCallsHandler } from "./response-handler/function-calls"
import { Command } from "@/types/command"

export class OpenAIResponses extends Endpoint {
    requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

	constructor(){
		super()
	}

    async sendRequest(command: Command) {
        
        try {

            const request = this.buildRequest(command)
            const client = OpenAIClientResolver.resolve(request)
            const response = await client.send(request)

            // response handler (chain of responsibilities)
            const functionCallsHandler: ResponseHandler = new FunctionCallsHandler(request, command.tools ? command.tools : [])
            const outputParsedHandler: ResponseHandler = new OutputParsedHandler()
            const outputTextHandler: ResponseHandler = new OutputTextHandler()
            const contentHandler: ResponseHandler = new ContentHandler()
            const emptyResponseHandler: ResponseHandler = new EmptyResponseHandler()
    
            functionCallsHandler
                .setNextHandler(outputParsedHandler)
                .setNextHandler(outputTextHandler)
                .setNextHandler(contentHandler)
                .setNextHandler(emptyResponseHandler)
    
            const responseHandler = functionCallsHandler


            return responseHandler.handle(response)
        } catch (error) {
            console.warn('[OpenAIProvider] Responses API request failed:', error)
            throw error
        }
    }

    
}