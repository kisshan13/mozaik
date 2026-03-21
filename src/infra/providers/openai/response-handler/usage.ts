import { MozaikResponse } from "@/app/core/response"
import { ResponseHandler } from "@/app/core/endpoint/response-handler"
import { UsageEntry } from "@/domain/usage-entry"
import { OpenAIModelPricing } from "@/infra/providers/openai/model-pricing"

export class UsageHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		const usage = providerResponse.usage

		const openAIModelPricing = new OpenAIModelPricing()
		const totalCost = openAIModelPricing.getPriceInUsd(
			providerResponse.model,
			usage.input_tokens,
			usage.output_tokens,
			usage.input_token_details?.cached_tokens ?? 0,
		)

		mozaikResponse.addUsageEntry(new UsageEntry(totalCost, providerResponse.model))

		return await this.nextHandler.handle(mozaikResponse)
	}
}
