import { MozaikResponse } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { UsageEntry } from "@core/usage-entry"

export class UsageHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		const usage = providerResponse.usage
		if (usage) {

			const cachedInputTokens = usage.input_token_details?.cached_tokens ?? 0
			const newInputTokens = usage.input_tokens - cachedInputTokens
			const outputTokens = usage.output_tokens

			mozaikResponse.addUsageEntry(
				new UsageEntry(newInputTokens, outputTokens, cachedInputTokens, providerResponse.model),
			)
		}
		return await this.nextHandler.handle(mozaikResponse)
	}
}
