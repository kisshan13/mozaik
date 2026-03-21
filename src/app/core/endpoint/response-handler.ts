import { MozaikResponse } from "../response"

export abstract class ResponseHandler {
	abstract nextHandler: ResponseHandler

	setNextHandler(responseHandler: ResponseHandler): ResponseHandler {
		this.nextHandler = responseHandler
		return this.nextHandler
	}

	abstract handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse>
}
