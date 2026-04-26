import { RuntimeContext } from "../agent-loop"
import { HookId } from "../hooks/hook"
import { GoTo } from "../transition/go-to"
import { Transition } from "../transition/transition"
import { State, StateDetails, StateId } from "./state"

export class MessageReceivedState implements State {
	id: StateId = StateId.MESSAGE_RECEIVED
	beforeHookId: HookId = HookId.BEFORE_MESSAGE_RECEIVED
	afterHookId: HookId = HookId.AFTER_MESSAGE_RECEIVED

	getDetails(): StateDetails {
		return {
			before: this.beforeHookId,
			stateId: this.id,
			after: this.afterHookId,
		}
	}

	validateEntry(context: RuntimeContext): void {}

	next(context: RuntimeContext): Transition {
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
