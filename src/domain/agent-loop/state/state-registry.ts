import { RuntimeContext } from "../loop"
import { StateId } from "./state"

export class StateHandlerRegistry {
	private handlers: Map<StateId, (context: RuntimeContext) => Promise<void>> = new Map<
		StateId,
		(context: RuntimeContext) => Promise<void>
	>()

	getHandler(stateId: StateId): (context: RuntimeContext) => Promise<void> {
		const handler = this.handlers.get(stateId)
		if (!handler) {
			throw new Error(`Handler for state ${stateId} not found`)
		}
		return handler
	}

	registerHandler(stateId: StateId, handler: (context: RuntimeContext) => Promise<void>): void {
		this.handlers.set(stateId, handler)
	}

	unregisterHandler(stateId: StateId): void {
		this.handlers.delete(stateId)
	}
}
