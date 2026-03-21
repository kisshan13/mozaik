import { Endpoint } from "@/app/core/endpoint/endpoint"
import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { OpenAIResponsesBuilder } from "./builder"
import { OpenAIClientResolver } from "./client/resolver"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"
import { OutputParsedHandler } from "./response-handler/output-parsed"
import { ContentHandler } from "./response-handler/content"
import { OutputTextHandler } from "./response-handler/output-text"
import { FunctionCallsHandler } from "./response-handler/function-calls"
import { InferenceSpecification } from "@/domain/types/inference-specification"
import { MozaikResponse } from "@/app/core/response"
import { UsageHandler } from "./response-handler/usage"

export class OpenAIResponses extends Endpoint {
	requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

	constructor() {
		super()
	}

	async sendRequest(inferenceSpecification: InferenceSpecification): Promise<any> {
		try {
			const request = this.buildRequest(inferenceSpecification)
			const client = OpenAIClientResolver.resolve(request)
			const response = await client.send(request)

			const mozaikResponse = new MozaikResponse()
			mozaikResponse.setProviderResponse(response)

			// response handler (chain of responsibilities)
			const usageHandler: ResponseHandler = new UsageHandler()
			const functionCallsHandler: ResponseHandler = new FunctionCallsHandler(
				request,
				inferenceSpecification.tools ? inferenceSpecification.tools : [],
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

			const result: MozaikResponse = await responseHandler.handle(mozaikResponse)

			return result.getResponse()
		} catch (error) {
			console.warn("[OpenAIProvider] Responses API request failed:", error)
			throw error
		}
	}
}
