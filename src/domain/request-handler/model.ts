import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { InferenceRequest } from "@/domain/inference/inference-request"

export class ModelHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceRequest: InferenceRequest, builder: RequestBuilder) {
		if (inferenceRequest.model) {
			builder.addModel(inferenceRequest.model)
		}
	}
}
