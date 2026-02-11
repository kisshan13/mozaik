import { ResponseContext } from "@core/endpoint/response-context"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class OutputParsedHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext) {
		const providerResponse = responseContext.providerResponse
		if (providerResponse.output_parsed) {
			responseContext.setResponse(providerResponse.output_parsed)
			return responseContext
		}

		return await this.nextHandler.handle(responseContext)
	}
}
