import { Endpoint } from "@/app/core/endpoint/endpoint"
import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { OpenAIResponsesBuilder } from "./builder"
import { OpenAIClientResolver } from "./client/resolver"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"
import { OutputParsedHandler } from "./response-handler/output-parsed"
import { ContentHandler } from "./response-handler/content"
import { OutputTextHandler } from "./response-handler/output-text"
import { FunctionCallsHandler } from "./response-handler/function-calls"
import { Context } from "@/domain/inference/context"
import { InferenceResponse } from "@/domain/inference/response"
import { UsageHandler } from "./response-handler/usage"

export class OpenAIResponses extends Endpoint {
	requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

	constructor() {
		super()
	}

	async sendRequest(context: Context): Promise<any> {
		try {
			const request = this.buildRequest(context)
			const client = OpenAIClientResolver.resolve(request)
			const response = await client.send(request)

			const inferenceResponse = new InferenceResponse()
			inferenceResponse.setProviderResponse(response)

			// response handler (chain of responsibilities)
			const usageHandler: ResponseHandler = new UsageHandler()
			const functionCallsHandler: ResponseHandler = new FunctionCallsHandler(
				request,
				context.tools ? context.tools : [],
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

			const result: InferenceResponse = await responseHandler.handle(inferenceResponse)

			return result.getResponse()
		} catch (error) {
			console.warn("[OpenAIProvider] Responses API request failed:", error)
			throw error
		}
	}
}
