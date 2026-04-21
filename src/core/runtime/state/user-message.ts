import { UserMessageHandler } from "../handler"
import { Fail, GoTo, RuntimeContext, State, StateId, Transition } from "../runtime"

export class UserMessageState implements State {
	id: StateId = StateId.USER_MESSAGE_HANDLER
	handler: UserMessageHandler

	constructor(handler: UserMessageHandler) {
		this.handler = handler
	}

	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			await this.handler.handle(runtime.execution.executionId, runtime.userMessage)
			return new GoTo(StateId.INFERENCE_REQUEST_HANDLER)
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}
