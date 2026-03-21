import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class ParsedOutputHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		if (providerResponse.parsed_output) {
			inferenceResponse.setResponseData(providerResponse.parsed_output)
			return inferenceResponse
		}

		return await this.nextHandler.handle(inferenceResponse)
	}
}
