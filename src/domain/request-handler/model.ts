import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { Context } from "@/domain/inference/context"

export class ModelHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(context: Context, builder: RequestBuilder) {
		if (context.model) {
			builder.addModel(context.model)
		}
	}
}
