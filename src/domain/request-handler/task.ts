import { RequestBuilder } from "@/app/core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { Context } from "@/domain/inference/context"

export class TaskHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(context: Context, builder: RequestBuilder) {
		if (context.task) {
			builder.addTask(context.task)
		}
	}
}
