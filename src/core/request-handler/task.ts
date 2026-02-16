import { RequestBuilder } from "@core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { MozaikRequest } from "@/types/request"

export class TaskHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(request: MozaikRequest, builder: RequestBuilder) {
		if (request.task) {
			builder.addTask(request.task)
		}
	}
}
