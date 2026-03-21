import { InferenceSpecification } from "@/domain/types/inference-specification"
import { CapabilityHandler } from "./capability"
import { RequestBuilder } from "@/app/core/endpoint/request-builder"

export class StructuredOutputlHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceSpecification: InferenceSpecification, builder: RequestBuilder) {
		if (inferenceSpecification.structuredOutput) {
			builder.addStructuredOutput(inferenceSpecification.structuredOutput)
		}
	}
}
