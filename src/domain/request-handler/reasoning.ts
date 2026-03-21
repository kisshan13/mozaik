import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { InferenceRequest } from "@/domain/inference/inference-request"

export class ReasoningHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceRequest: InferenceRequest, builder: RequestBuilder) {
		if (inferenceRequest.reasoningEffort) {
			builder.addReasoningEffort(inferenceRequest.reasoningEffort)
		}
	}
}
