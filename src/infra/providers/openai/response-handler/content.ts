import { MozaikResponse } from "@/app/core/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		const firstOutput = providerResponse.output?.[0]
		if (firstOutput && "content" in firstOutput) {
			const firstContent = firstOutput.content?.[0]
			if (firstContent && "text" in firstContent) {
				mozaikResponse.setResponseData(firstContent.text)
				return mozaikResponse
			}
		}

		return await this.nextHandler.handle(mozaikResponse)
	}
}
