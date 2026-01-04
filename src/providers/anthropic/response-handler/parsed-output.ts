import { ResponseHandler } from "@core/endpoint/response-handler"

export class ParsedOutputHandler extends ResponseHandler {
	nextHandler!: ResponseHandler

	handle(response: any) {
		if (response.parsed_output) {
			return response.parsed_output
		}

		return this.nextHandler.handle(response)
	}
}
