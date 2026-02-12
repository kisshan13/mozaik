import { ResponseContext } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext): Promise<ResponseContext> {
		const providerResponse = responseContext.providerResponse
		const content = providerResponse.content
			.filter((block: any) => block.type === "text")
			.map((block: any) => (block.type === "text" ? block.text : ""))
			.join("")

		if (content) {
			responseContext.setResponse(content)
			return responseContext
		}

		return await this.nextHandler.handle(responseContext)
	}
}
