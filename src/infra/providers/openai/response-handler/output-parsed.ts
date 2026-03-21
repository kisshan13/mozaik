import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class OutputParsedHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		if (providerResponse.output_parsed) {
			inferenceResponse.setResponseData(providerResponse.output_parsed)
			return inferenceResponse
		}

		return await this.nextHandler.handle(inferenceResponse)
	}
}
