import { RequestBuilder } from "@core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { InferenceSpecification } from "@/types/inference-specification"

export class MessagesHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceSpecification: InferenceSpecification, builder: RequestBuilder) {
		if (inferenceSpecification.messages) {
			builder.addMessages(inferenceSpecification.messages)
		}
	}
}
