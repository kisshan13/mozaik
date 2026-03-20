import { RequestBuilder } from "@core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { InferenceSpecification } from "@/types/inference-specification"

export class TaskHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(inferenceSpecification: InferenceSpecification, builder: RequestBuilder) {
		if (inferenceSpecification.task) {
			builder.addTask(inferenceSpecification.task)
		}
	}
}
