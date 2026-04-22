import { StateId } from "@domain/agnet-loop/state/state"
import { StateHandler } from "@app/agent-runtime/state-handler"
import { UserMessageHandler } from "@app/agent-runtime/user-message-handler"

export class StateHandlerRepository {
	private static handlers: Map<StateId, StateHandler> = new Map<StateId, StateHandler>()

	constructor() {
		StateHandlerRepository.handlers.set(StateId.USER_MESSAGE_RECEIVED, new UserMessageHandler())
	}

	static getHandler(stateId: StateId): StateHandler {
		const handler = this.handlers.get(stateId)
		if (!handler) {
			throw new Error(`Handler for state ${stateId} not found`)
		}
		return handler
	}
}
