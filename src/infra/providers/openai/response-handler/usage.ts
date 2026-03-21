import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"
import { UsageEntry } from "@/domain/usage-entry"
import { OpenAIModelPricing } from "@/infra/providers/openai/model-pricing"

export class UsageHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		const usage = providerResponse.usage

		const openAIModelPricing = new OpenAIModelPricing()
		const totalCost = openAIModelPricing.getPriceInUsd(
			providerResponse.model,
			usage.input_tokens,
			usage.output_tokens,
			usage.input_token_details?.cached_tokens ?? 0,
		)

		inferenceResponse.addUsageEntry(new UsageEntry(totalCost, providerResponse.model))

		return await this.nextHandler.handle(inferenceResponse)
	}
}
