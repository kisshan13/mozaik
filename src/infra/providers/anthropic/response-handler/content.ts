import { MozaikResponse } from "@/app/core/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		const content = providerResponse.content
			.filter((block: any) => block.type === "text")
			.map((block: any) => (block.type === "text" ? block.text : ""))
			.join("")

		if (content) {
			mozaikResponse.setResponseData(content)
			return mozaikResponse
		}

		return await this.nextHandler.handle(mozaikResponse)
	}
}
