import { InferenceRequest } from "@/domain/inference/inference-request"
import { RequestBuilder } from "../../app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"

export class ToolsHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceRequest: InferenceRequest, requestBuilder: RequestBuilder) {
		if (inferenceRequest.tools && inferenceRequest.tools.length > 0) {
			requestBuilder.addTools(inferenceRequest.tools)
		}
	}
}
