import { ResponseContext } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class ParsedOutputHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext): Promise<ResponseContext> {
		const providerResponse = responseContext.providerResponse
		if (providerResponse.parsed_output) {
			responseContext.setResponse(providerResponse.parsed_output)
			return responseContext
		}

		return await this.nextHandler.handle(responseContext)
	}
}
