import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class OutputTextHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		if (providerResponse.output_text) {
			inferenceResponse.setResponseData(providerResponse.output_text)
			return inferenceResponse
		}

		return await this.nextHandler.handle(inferenceResponse)
	}
}
