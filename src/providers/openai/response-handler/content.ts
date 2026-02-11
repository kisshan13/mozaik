import { ResponseContext } from "@core/endpoint/response-context"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext): Promise<ResponseContext> {
		const providerResponse = responseContext.providerResponse
		const firstOutput = providerResponse.output?.[0]
		if (firstOutput && "content" in firstOutput) {
			const firstContent = firstOutput.content?.[0]
			if (firstContent && "text" in firstContent) {
				responseContext.setResponse(firstContent.text)
				return responseContext
			}
		}

		return await this.nextHandler.handle(responseContext)
	}
}
