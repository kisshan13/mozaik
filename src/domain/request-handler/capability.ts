import { InferenceRequest } from "@/domain/inference/inference-request"
import { RequestBuilder } from "../../app/core/endpoint/request-builder"

export abstract class CapabilityHandler {
	abstract nextHandler: CapabilityHandler

	setNextHandler(capability: CapabilityHandler): CapabilityHandler {
		this.nextHandler = capability
		return this.nextHandler
	}

	abstract apply(inferenceRequest: InferenceRequest, requestBuilder: RequestBuilder): any

	handle(inferenceRequest: InferenceRequest, builder: RequestBuilder) {
		this.apply(inferenceRequest, builder)

		if (this.nextHandler) {
			this.nextHandler.handle(inferenceRequest, builder)
		}
	}
}
