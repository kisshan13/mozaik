import { MozaikResponse } from "@core/response"
import { ResponseHandler } from "@core/endpoint/response-handler"

export class UnhandledResponseHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		const providerResponse = mozaikResponse.providerResponse
		const id = providerResponse?.id ?? "unknown"
		const model = providerResponse?.model ?? "unknown"

		throw new Error(`No response handler matched. response_id=${id} model=${model}`)
	}
}
