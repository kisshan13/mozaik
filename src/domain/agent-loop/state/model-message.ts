import { HookId } from "@app/agent-runtime/hooks-registry"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateId } from "@domain/agent-loop/state/state"
import { Complete } from "@domain/agent-loop/transition/complete"
import { Fail } from "@domain/agent-loop/transition/fail"
import { Transition } from "@domain/agent-loop/transition/transition"

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_RECEIVED

	entry(runtime: RuntimeContext): HookId | undefined {
		return HookId.BEFORE_MODEL_MESSAGE
	}

	next(runtime: RuntimeContext): Transition {
		if (!runtime.modelMessage) {
			return new Fail("Model message not found")
		}
		return new Complete(runtime.modelMessage.content.text)
	}
}
