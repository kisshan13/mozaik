import { MozaikResponse } from "@/app/core/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class OutputTextHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		if (providerResponse.output_text) {
			mozaikResponse.setResponseData(providerResponse.output_text)
			return mozaikResponse
		}

		return await this.nextHandler.handle(mozaikResponse)
	}
}
