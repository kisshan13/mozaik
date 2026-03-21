import { MozaikResponse } from "@/app/core/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class ParsedOutputHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		if (providerResponse.parsed_output) {
			mozaikResponse.setResponseData(providerResponse.parsed_output)
			return mozaikResponse
		}

		return await this.nextHandler.handle(mozaikResponse)
	}
}
