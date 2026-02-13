import { MozaikRequest } from "@/types/request"
import { RequestBuilder } from "../endpoint/request-builder"

export abstract class CapabilityHandler {
	abstract nextHandler: CapabilityHandler

	setNextHandler(capability: CapabilityHandler): CapabilityHandler {
		this.nextHandler = capability
		return this.nextHandler
	}

	abstract apply(request: MozaikRequest, requestBuilder: RequestBuilder): any

	handle(request: MozaikRequest, builder: RequestBuilder) {
		this.apply(request, builder)

		if (this.nextHandler) {
			this.nextHandler.handle(request, builder)
		}
	}
}
