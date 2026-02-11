import { ResponseContext } from "@core/endpoint/response-context"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class OutputTextHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext) {
		const providerResponse = responseContext.providerResponse
		if (providerResponse.output_text) {
			responseContext.setResponse(providerResponse.output_text)
			return responseContext
		}

		return await this.nextHandler.handle(responseContext)
	}
}
