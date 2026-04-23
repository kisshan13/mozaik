import { HookId } from "@domain/agent-loop/hooks/hook"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateHooks, StateId } from "@domain/agent-loop/state/state"
import { Complete } from "@domain/agent-loop/transition/complete"
import { Fail } from "@domain/agent-loop/transition/fail"
import { Transition } from "@domain/agent-loop/transition/transition"


export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_RECEIVED

	entry(runtime: RuntimeContext): StateHooks {
		return {
			before: HookId.BEFORE_MODEL_MESSAGE,
			after: HookId.ON_MODEL_MESSAGE,
		}
	}

	next(runtime: RuntimeContext): Transition {
		if (!runtime.modelMessage) {
			return new Fail("Model message not found")
		}
		return new Complete(runtime.modelMessage.content.text)
	}
}
