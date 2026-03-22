import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { Context } from "@/domain/inference/context"

export class MessagesHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(context: Context, builder: RequestBuilder) {
		if (context.messages) {
			builder.addMessages(context.messages)
		}
	}
}
