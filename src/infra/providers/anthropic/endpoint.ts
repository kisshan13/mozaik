import { Endpoint } from "@/app/core/endpoint/endpoint"
import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import { AnthropicClientResolver } from "./client/resolver"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"
import { ParsedOutputHandler } from "./response-handler/parsed-output"
import { ContentHandler } from "./response-handler/content"
import { ToolUseHandler } from "./response-handler/tool-use"
import { InferenceRequest } from "@/domain/inference/inference-request"
import { InferenceResponse } from "@/domain/inference/response"
import { UsageHandler } from "./response-handler/usage"
import { UnhandledResponseHandler } from "./response-handler/undhandled"

export class AnthropicEndpoint extends Endpoint {
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

	async sendRequest(inferenceRequest: InferenceRequest): Promise<any> {
		const providerRequest = this.buildRequest(inferenceRequest)
		const client = AnthropicClientResolver.resolve(providerRequest)
		const response = await client.send(providerRequest)

		const inferenceResponse = new InferenceResponse()
		inferenceResponse.setProviderResponse(response)

		// response handler (chain of responsibilities)
		const usageHandler: ResponseHandler = new UsageHandler()
		const toolUseHandler: ResponseHandler = new ToolUseHandler(
			providerRequest,
			inferenceRequest.tools ? inferenceRequest.tools : [],
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

		const result = await responseHandler.handle(inferenceResponse)

		return result.getResponse()
	}
}
