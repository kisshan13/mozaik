import { RequestBuilder } from "@core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { MozaikRequest } from "@/types/request"

export class MessagesHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(request: MozaikRequest, builder: RequestBuilder) {
		if (request.messages) {
			builder.addMessages(request.messages)
		}
	}
}
