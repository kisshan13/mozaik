import { MozaikRequest } from "@/types/request"
import { CapabilityHandler } from "./capability"
import { RequestBuilder } from "@core/endpoint/request-builder"

export class StructuredOutputlHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(request: MozaikRequest, builder: RequestBuilder) {
		if (request.structuredOutput) {
			builder.addStructuredOutput(request.structuredOutput)
		}
	}
}
