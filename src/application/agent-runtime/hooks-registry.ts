import { HookHandler } from "@app/agent-runtime/hook-handler"
import { UserMessageHandler } from "@app/agent-runtime/user-message-handler"

export enum HookId {
	ON_USER_MESSAGE_RECEIVED = "ON_USER_MESSAGE_RECEIVED",
	BEFORE_INFERENCE = "BEFORE_INFERENCE",
	AFTER_INFERENCE = "AFTER_INFERENCE",
	BEFORE_FUNCTION_CALL = "BEFORE_FUNCTION_CALL",
	AFTER_FUNCTION_CALL = "AFTER_FUNCTION_CALL",
	BEFORE_MODEL_MESSAGE = "BEFORE_MODEL_MESSAGE",
	ON_MODEL_MESSAGE = "ON_MODEL_MESSAGE",
}

export class HooksRegistry {
	private static handlers: Map<HookId, HookHandler> = new Map<HookId, HookHandler>()

	constructor() {
		HooksRegistry.handlers.set(HookId.ON_USER_MESSAGE_RECEIVED, new UserMessageHandler())
	}

	static getHandler(hookId: HookId): HookHandler {
		const handler = this.handlers.get(hookId)
		if (!handler) {
			throw new Error(`Hook handler for hook ${hookId} not found`)
		}
		return handler
	}
}
