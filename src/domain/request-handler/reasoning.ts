import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { Context } from "@/domain/inference/context"

export class ReasoningHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(context: Context, builder: RequestBuilder) {
		if (context.reasoningEffort) {
			builder.addReasoningEffort(context.reasoningEffort)
		}
	}
}
