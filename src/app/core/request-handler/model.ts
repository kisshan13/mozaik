import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { InferenceSpecification } from "@/domain/types/inference-specification"

export class ModelHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceSpecification: InferenceSpecification, builder: RequestBuilder) {
		if (inferenceSpecification.model) {
			builder.addModel(inferenceSpecification.model)
		}
	}
}
