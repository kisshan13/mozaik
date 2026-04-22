import { HookId } from "@app/agent-runtime/hooks-registry"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateId } from "@domain/agent-loop/state/state"
import { GoTo } from "@domain/agent-loop/transition/go-to"
import { Transition } from "@domain/agent-loop/transition/transition"

export class UserMessageState implements State {
	id: StateId = StateId.USER_MESSAGE_RECEIVED

	entry(runtime: RuntimeContext): HookId | undefined {
		return HookId.ON_USER_MESSAGE_RECEIVED
	}

	next(runtime: RuntimeContext): Transition {
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
