import { InferenceResponse } from "../../../domain/inference/response"

export abstract class ResponseHandler {
	abstract nextHandler: ResponseHandler

	setNextHandler(responseHandler: ResponseHandler): ResponseHandler {
		this.nextHandler = responseHandler
		return this.nextHandler
	}

	abstract handle(inferenceResponse: InferenceResponse): Promise<InferenceResponse>
}
