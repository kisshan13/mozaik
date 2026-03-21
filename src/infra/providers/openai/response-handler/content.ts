import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		const firstOutput = providerResponse.output?.[0]
		if (firstOutput && "content" in firstOutput) {
			const firstContent = firstOutput.content?.[0]
			if (firstContent && "text" in firstContent) {
				inferenceResponse.setResponseData(firstContent.text)
				return inferenceResponse
			}
		}

		return await this.nextHandler.handle(inferenceResponse)
	}
}
