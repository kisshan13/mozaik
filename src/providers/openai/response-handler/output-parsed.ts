import { MozaikResponse } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class OutputParsedHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: MozaikResponse) {
		const providerResponse = responseContext.providerResponse
		if (providerResponse.output_parsed) {
			responseContext.setResponseData(providerResponse.output_parsed)
			return responseContext
		}

		return await this.nextHandler.handle(responseContext)
	}
}
