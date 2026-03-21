import { InferenceResponse } from "@/domain/inference/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"
import { UsageEntry } from "@/domain/usage-entry"
import { AnthropicModelPricing } from "../model-pricing"

export class UsageHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse> {
		const providerResponse = inferenceResponse.providerResponse
		const usage = providerResponse.usage

		const anthropicModelPricing = new AnthropicModelPricing()
		const totalCost = anthropicModelPricing.getPriceInUsd(
			providerResponse.model,
			usage.input_tokens,
			usage.output_tokens,
		)
		if (usage) {
			inferenceResponse.addUsageEntry(new UsageEntry(totalCost, providerResponse.model))
		}
		return await this.nextHandler.handle(inferenceResponse)
	}
}
