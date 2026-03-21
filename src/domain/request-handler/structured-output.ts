import { InferenceRequest } from "@/domain/inference/inference-request"
import { CapabilityHandler } from "./capability"
import { RequestBuilder } from "@/app/core/endpoint/request-builder"

export class StructuredOutputlHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceRequest: InferenceRequest, builder: RequestBuilder) {
		if (inferenceRequest.structuredOutput) {
			builder.addStructuredOutput(inferenceRequest.structuredOutput)
		}
	}
}
