import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"

export class UnhandledResponseHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		const id = providerResponse?.id ?? "unknown"
		const model = providerResponse?.model ?? "unknown"

		throw new Error(`No response handler matched. response_id=${id} model=${model}`)
	}
}
