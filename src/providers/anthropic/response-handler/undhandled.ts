import { ResponseContext } from "@core/endpoint/response-context"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class UnhandledResponseHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(responseContext: ResponseContext): Promise<ResponseContext> {
		const providerResponse = responseContext.providerResponse
		const id = providerResponse?.id ?? "unknown"
		const model = providerResponse?.model ?? "unknown"

		throw new Error(`No response handler matched. response_id=${id} model=${model}`)
	}
}
