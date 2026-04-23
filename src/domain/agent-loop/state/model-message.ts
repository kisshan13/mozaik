import { HookId } from "@domain/agent-loop/hooks/hook"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateDetails, StateId } from "@domain/agent-loop/state/state"
import { Complete } from "@domain/agent-loop/transition/complete"
import { Fail } from "@domain/agent-loop/transition/fail"
import { Transition } from "@domain/agent-loop/transition/transition"

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_RECEIVED
	beforeHookId: HookId = HookId.BEFORE_MODEL_MESSAGE
	afterHookId: HookId = HookId.AFTER_MODEL_MESSAGE

	getDetails(): StateDetails {
		return {
			before: this.beforeHookId,
			stateId: this.id,
			after: this.afterHookId,
		}
	}

	validateEntry(runtime: RuntimeContext): void {
		if (!runtime.modelMessage) {
			throw new Error("Model message not found")
		}
	}

	next(runtime: RuntimeContext): Transition {
		if (!runtime.modelMessage) {
			return new Fail("Model message not found")
		}
		return new Complete(runtime.modelMessage.content.text)
	}
}
