import { Command } from "@/types/command"
import { RequestBuilder } from "../endpoint/request-builder"
import { CapabilityHandler } from "./capability"

export class ToolsHandler extends CapabilityHandler {
	nextHandler!: CapabilityHandler

	apply(command: Command, requestBuilder: RequestBuilder) {
		if (command.tools && command.tools.length > 0) {
			requestBuilder.addTools(command.tools)
		}
	}
}
