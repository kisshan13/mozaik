import { Context } from "@/domain/inference/context"
import { CapabilityHandler } from "./capability"
import { RequestBuilder } from "@/app/core/endpoint/request-builder"

export class StructuredOutputlHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(context: Context, builder: RequestBuilder) {
		if (context.structuredOutput) {
			builder.addStructuredOutput(context.structuredOutput)
		}
	}
}
