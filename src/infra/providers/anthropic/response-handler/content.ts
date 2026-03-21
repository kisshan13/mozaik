import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		const content = providerResponse.content
			.filter((block: any) => block.type === "text")
			.map((block: any) => (block.type === "text" ? block.text : ""))
			.join("")

		if (content) {
			inferenceResponse.setResponseData(content)
			return inferenceResponse
		}

		return await this.nextHandler.handle(inferenceResponse)
	}
}
