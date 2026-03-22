import { Context } from "@/domain/inference/context"
import { RequestBuilder } from "../../app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"

export class ToolsHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(context: Context, requestBuilder: RequestBuilder) {
		if (context.tools && context.tools.length > 0) {
			requestBuilder.addTools(context.tools)
		}
	}
}
