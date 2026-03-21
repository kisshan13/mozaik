import { InferenceSpecification } from "@/domain/types/inference-specification"
import { RequestBuilder } from "../endpoint/request-builder"
import { CapabilityHandler } from "./capability"

export class ToolsHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceSpecification: InferenceSpecification, requestBuilder: RequestBuilder) {
		if (inferenceSpecification.tools && inferenceSpecification.tools.length > 0) {
			requestBuilder.addTools(inferenceSpecification.tools)
		}
	}
}
