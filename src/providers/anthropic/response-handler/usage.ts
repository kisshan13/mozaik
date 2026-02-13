import { MozaikResponse } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { UsageEntry } from "@core/usage-entry"
import { AnthropicModelPricing } from "../model-pricing"

export class UsageHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		const usage = providerResponse.usage

		const anthropicModelPricing = new AnthropicModelPricing()
		const totalCost = anthropicModelPricing.getPriceInUsd(
			providerResponse.model,
			usage.input_tokens,
			usage.output_tokens,
		)
		if (usage) {
			mozaikResponse.addUsageEntry(new UsageEntry(totalCost, providerResponse.model))
		}
		return await this.nextHandler.handle(mozaikResponse)
	}
}
