import { MozaikRequest } from "@/types/request"
import { RequestBuilder } from "../endpoint/request-builder"
import { CapabilityHandler } from "./capability"

export class ToolsHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(mozaikRequest: MozaikRequest, requestBuilder: RequestBuilder) {
		if (mozaikRequest.tools && mozaikRequest.tools.length > 0) {
			requestBuilder.addTools(mozaikRequest.tools)
		}
	}
}
