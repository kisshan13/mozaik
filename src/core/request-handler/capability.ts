import { InferenceSpecification } from "@/types/inference-specification"
import { RequestBuilder } from "../endpoint/request-builder"

export abstract class CapabilityHandler {
	abstract nextHandler: CapabilityHandler

	setNextHandler(capability: CapabilityHandler): CapabilityHandler {
		this.nextHandler = capability
		return this.nextHandler
	}

	abstract apply(inferenceSpecification: InferenceSpecification, requestBuilder: RequestBuilder): any

	handle(inferenceSpecification: InferenceSpecification, builder: RequestBuilder) {
		this.apply(inferenceSpecification, builder)

		if (this.nextHandler) {
			this.nextHandler.handle(inferenceSpecification, builder)
		}
	}
}
