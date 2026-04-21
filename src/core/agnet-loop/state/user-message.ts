import { UserMessageHandler } from "../handler"
import { RuntimeContext } from "../loop"
import { State, StateId } from "./state"
import { GoTo } from "../transition/go-to"
import { Fail } from "../transition/fail"
import { Transition } from "../transition/transition"

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
