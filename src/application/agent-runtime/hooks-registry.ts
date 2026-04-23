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
	private handlers: Map<HookId, (data: any) => Promise<void>> = new Map<HookId, (data: any) => Promise<void>>()

	getHandler(hookId: HookId): (data: any) => Promise<void> {
		const handler = this.handlers.get(hookId)
		if (!handler) {
			throw new Error(`Hook handler for hook ${hookId} not found`)
		}
		return handler
	}

	registerHandler(hookId: HookId, handler: (data: any) => Promise<void>): void {
		this.handlers.set(hookId, handler)
	}

	unregisterHandler(hookId: HookId): void {
		this.handlers.delete(hookId)
	}
}
