import { Context } from "@/domain/inference/context"
import { RequestBuilder } from "../../app/core/endpoint/request-builder"

export abstract class CapabilityHandler {
	abstract nextHandler: CapabilityHandler

	setNextHandler(capability: CapabilityHandler): CapabilityHandler {
		this.nextHandler = capability
		return this.nextHandler
	}

	abstract apply(context: Context, requestBuilder: RequestBuilder): any

	handle(context: Context, builder: RequestBuilder) {
		this.apply(context, builder)

		if (this.nextHandler) {
			this.nextHandler.handle(context, builder)
		}
	}
}
