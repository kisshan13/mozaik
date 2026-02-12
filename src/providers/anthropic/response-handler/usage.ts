import { ResponseContext } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { UsageEntry } from "@core/usage-entry"

export class UsageHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext): Promise<ResponseContext> {
		const providerResponse = responseContext.providerResponse
		const usage = providerResponse.usage
		if (usage) {
			responseContext.addUsageEntry(
				new UsageEntry(usage.input_tokens, usage.output_tokens, providerResponse.model),
			)
		}
		return await this.nextHandler.handle(responseContext)
	}
}
